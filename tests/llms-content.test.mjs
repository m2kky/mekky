import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const readPublicFile = (filename) =>
  readFileSync(resolve(process.cwd(), 'public', filename), 'utf8');

test('concise llms files direct detailed queries to the full corpus', () => {
  assert.match(readPublicFile('llms.txt'), /Read \/llms-full\.txt/i);
  assert.match(readPublicFile('llms-ar.txt'), /اقرأ \/llms-full\.txt/);
});

test('full corpus preserves public identity, experience, and contact details', () => {
  const full = readPublicFile('llms-full.txt');

  for (const text of [
    'Muhammed Mekky',
    'AI Marketing & Business Automation Systems Architect',
    '7+ years of experience',
    '284+ completed projects',
    '263+ global clients',
    '2,400+ people impacted',
    'Contact@muhammedmekky.com',
    'https://wa.me/201098620547',
  ]) {
    assert.ok(full.includes(text), `Missing: ${text}`);
  }
});

test('full corpus inventories public work and provenance safeguards', () => {
  const full = readPublicFile('llms-full.txt');

  for (const text of [
    'JBL Flip 6',
    'Yara Fathy',
    'Automating a 6-Figure Agency',
    'Smart Workshop Scheduling System',
    'Ninja GenZ',
    'Scarpe Handmade',
    'public-site',
    'db-published',
    'site-stated',
    'Last reviewed: 2026-07-26',
  ]) {
    assert.ok(full.includes(text), `Missing: ${text}`);
  }
});
