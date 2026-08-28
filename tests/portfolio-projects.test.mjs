import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();
const constants = readFileSync(join(root, 'src/lib/constants.ts'), 'utf8');
const projectClient = readFileSync(
  join(root, 'src/app/portfolio/[slug]/ProjectClient.tsx'),
  'utf8',
);

test('publishes the newest projects first and refreshes Bravo in place', () => {
  const rammah = constants.indexOf("slug: 'ahmed-rammah'");
  const hossam = constants.indexOf("slug: 'coach-hossam-ibrahim'");
  const jbl = constants.indexOf("slug: 'jbl-flip-6'");

  assert.ok(rammah >= 0, 'Ahmed Rammah project is missing');
  assert.ok(hossam >= 0, 'Coach Hossam Ibrahim project is missing');
  assert.ok(rammah < hossam && hossam < jbl, 'new projects must be first');
  assert.match(constants, /slug: 'mahmoud-bravo'[\s\S]*Next\.js 16/);
});

test('uses the PROJECTS camelCase detail contract', () => {
  assert.match(projectClient, /project\.longDescription/);
  assert.match(projectClient, /project\.liveUrl/);
  assert.doesNotMatch(projectClient, /project\.long_description/);
  assert.doesNotMatch(projectClient, /project\.live_url/);
});

test('ships card, desktop, and mobile images for each refreshed project', () => {
  for (const slug of [
    'ahmed-rammah',
    'coach-hossam-ibrahim',
    'mahmoud-bravo',
  ]) {
    for (const suffix of ['', '-desktop', '-mobile']) {
      assert.ok(
        existsSync(join(root, `public/images/projects/${slug}${suffix}.webp`)),
        `${slug}${suffix}.webp is missing`,
      );
    }
  }
});
