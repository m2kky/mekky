import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const routeFiles = [
  'src/app/prompt-to-product/page.tsx',
  'src/app/prompt-to-product/PromptToProductClient.tsx',
  'src/app/prompt-to-product/CourseLanding.tsx',
  'src/app/prompt-to-product/PromptToProduct.module.css',
];

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

  assert.match(page, /Prompt to Product — Live Vibe Coding Camp/);
  assert.match(page, /canonical: '\/prompt-to-product'/);
  assert.match(client, /const startWaitlist = \(\) =>/);
  assert.match(client, /prefers-reduced-motion: reduce/);
  assert.match(landing, /Media Buyers/);
  assert.match(landing, /import Link from 'next\/link'/);
  assert.match(landing, /courseStats\.map/);
  assert.match(landing, /projectProof\.map/);
  assert.match(landing, /courseSessions\.map/);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media \(prefers-reduced-motion:reduce\)/);
});
