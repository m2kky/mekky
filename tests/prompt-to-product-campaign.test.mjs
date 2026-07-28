import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const routeFiles = [
  'src/app/prompt-to-product/page.tsx',
  'src/app/prompt-to-product/PromptToProductClient.tsx',
  'src/app/prompt-to-product/CourseLanding.tsx',
  'src/app/prompt-to-product/PromptToProduct.module.css',
];

const clientSource = readFileSync(routeFiles[1], 'utf8');
const landingSource = readFileSync(routeFiles[2], 'utf8');
const styleSource = readFileSync(routeFiles[3], 'utf8');
const floatingCtaSource = readFileSync('src/components/FloatingCTA.tsx', 'utf8');
const currentProjectsWidgetSource = readFileSync('src/components/CurrentProjectsWidget.tsx', 'utf8');
const popupRendererSource = readFileSync('src/components/PopupRenderer.tsx', 'utf8');

const relativeLuminance = (hex) => {
  const channels = hex.match(/[0-9a-f]{2}/gi).map((channel) => parseInt(channel, 16) / 255);
  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrastRatio = (foreground, background) => {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
    / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
};

test('publishes the complete prompt-to-product campaign route', () => {
  assert.equal(
    routeFiles.every((file) => existsSync(file)),
    true,
    'expected every campaign route file to exist'
  );

  const page = readFileSync(routeFiles[0], 'utf8');
  const client = readFileSync(routeFiles[1], 'utf8');
  const landing = readFileSync(routeFiles[2], 'utf8');
  const styles = readFileSync(routeFiles[3], 'utf8');

  assert.match(page, /AI Product Engineer/);
  assert.match(page, /canonical: '\/prompt-to-product'/);
  assert.match(client, /const startWaitlist = \(\) =>/);
  assert.match(client, /prefers-reduced-motion: reduce/);
  assert.match(landing, /مبتدئين/);
  assert.match(landing, /import Link from 'next\/link'/);
  assert.match(landing, /courseStats\.map/);
  assert.match(landing, /projectProof\.map/);
  assert.match(landing, /courseSessions\.map/);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media \(prefers-reduced-motion:reduce\)/);
});

test('disables hero entrance transforms when reduced motion is preferred', () => {
  assert.match(landingSource, /useReducedMotion/);
  assert.match(landingSource, /const shouldReduceMotion = useReducedMotion\(\)/);
  assert.equal(
    landingSource.match(/initial=\{shouldReduceMotion \? false/g)?.length,
    3,
    'expected each hero entrance to render at its final state with reduced motion'
  );
});

test('identifies the campaign language and English-only islands', () => {
  assert.match(clientSource, /<main[^>]+lang="ar"/);
  assert.ok(
    (landingSource.match(/lang="en"/g)?.length ?? 0) >= 6,
    'expected language metadata on the major English-only islands'
  );
});

test('keeps small orange-on-paper text and orange hover labels readable', () => {
  const paper = styleSource.match(/--paper:\s*(#[0-9a-f]{6})/i)?.[1];
  const orangeInk = styleSource.match(/--orange-on-paper:\s*(#[0-9a-f]{6})/i)?.[1];

  assert.ok(paper && orangeInk, 'expected paper and orange-on-paper color tokens');
  assert.ok(
    contrastRatio(orangeInk, paper) >= 4.5,
    'small orange text on paper must meet WCAG AA contrast'
  );
  assert.match(styleSource, /\.gapSection \.sectionIndex[\s\S]*var\(--orange-on-paper\)/);
  assert.match(styleSource, /\.primaryCta:hover\s*\{[^}]*color:\s*var\(--ink\)/s);
  assert.match(styleSource, /\.offerCopy \.primaryCta:hover\s*\{[^}]*color:\s*var\(--ink\)/s);
});

test('exposes each campaign section through a labelled region', () => {
  assert.ok(
    (landingSource.match(/aria-labelledby=/g)?.length ?? 0) >= 8,
    'expected the hero and every content section to reference a visible heading'
  );
});

test('suppresses global distractions across the campaign route tree', () => {
  const promptToProductRouteGuard = /pathname\?\.startsWith\('\/prompt-to-product'\)/;

  assert.match(floatingCtaSource, promptToProductRouteGuard);
  assert.match(currentProjectsWidgetSource, promptToProductRouteGuard);
  assert.match(popupRendererSource, promptToProductRouteGuard);
});
