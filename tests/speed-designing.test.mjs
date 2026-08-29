import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import test from 'node:test';

const read = (path) => readFileSync(path, 'utf8');
const registryPath = 'src/data/speedDesigningProjects.ts';
const pagePath = 'src/app/speeddesigning/page.tsx';

test('publishes only intentional archive entries in newest-first order', async () => {
  assert.ok(existsSync(registryPath), 'speed-designing registry must exist');
  const registry = await import(`${pathToFileURL(`${process.cwd()}/${registryPath}`).href}?test=${Date.now()}`);
  const base = {
    personName: 'Test Person', profession: 'Test', positioning: 'Test', coverImage: '/test.webp',
    accentColor: '#000000', websitePath: '/test', blueprintPath: '/test/blueprint', publishDate: '2026-01-01',
    language: 'en', designStyles: ['Editorial'], featured: false,
  };
  const visible = registry.getPublicSpeedDesigningProjects([
    { ...base, episodeNumber: 1, slug: 'published', status: 'published' },
    { ...base, episodeNumber: 4, slug: 'draft', status: 'draft' },
    { ...base, episodeNumber: 2, slug: 'hidden-soon', status: 'coming-soon' },
    { ...base, episodeNumber: 3, slug: 'visible-soon', status: 'coming-soon', showComingSoon: true },
  ]);

  assert.deepEqual(visible.map((project) => project.slug), ['visible-soon', 'published']);
  assert.deepEqual(registry.speedDesigningProjects, []);
});

test('ships the standalone series route, metadata, and intentional empty state', () => {
  assert.ok(existsSync(pagePath), 'speed-designing route must exist');
  const page = read(pagePath);
  assert.match(page, /SPEED DESIGNING/);
  assert.match(page, /Personal websites for people who should already have one\./);
  assert.match(page, /independent speculative design series/i);
  assert.match(page, /getPublicSpeedDesigningProjects/);
  assert.match(page, /canonical:\s*['"]\/speeddesigning['"]/);
  assert.match(page, /The first public experiment is being prepared\./);
});

test('keeps the intro local, skippable, session-aware, and reduced-motion safe', () => {
  const introPath = 'src/components/speeddesigning/SeriesIntro.tsx';
  assert.ok(existsSync(introPath), 'series intro must exist');
  const intro = read(introPath);
  assert.match(intro, /speed-designing-intro-seen-v1/);
  assert.match(intro, /prefers-reduced-motion/);
  assert.match(intro, /Skip intro/);
  for (const asset of ['compact.webp', 'signature.webp', 'monogram.webp']) {
    assert.ok(existsSync(`public/speeddesigning/brand/${asset}`), `${asset} must be local`);
  }
});

test('adds discoverability and suppresses global interruptions', () => {
  assert.match(read('src/app/sitemap.ts'), /speeddesigning/);
  for (const file of [
    'src/components/FloatingCTA.tsx',
    'src/components/CurrentProjectsWidget.tsx',
    'src/components/PopupRenderer.tsx',
  ]) {
    assert.match(read(file), /startsWith\(['"]\/speeddesigning['"]\)/, `${file} must hide on the series route`);
  }
  assert.match(read('package.json'), /"test:speeddesigning"/);
});
