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
  assert.deepEqual(registry.speedDesigningProjects.map((project) => project.slug), ['ehsan-elsayed']);
});

test('publishes Ehsan episode one with its website and Blueprint contracts', () => {
  const routeRoot = 'src/app/speeddesigning/ehsan-elsayed';
  const experiencePath = `${routeRoot}/EhsanExperience.tsx`;
  const blueprintPath = `${routeRoot}/blueprint/page.tsx`;
  for (const path of [
    `${routeRoot}/layout.tsx`, `${routeRoot}/page.tsx`, experiencePath,
    `${routeRoot}/EhsanExperience.module.css`, blueprintPath,
    `${routeRoot}/blueprint/Blueprint.module.css`,
    'public/speeddesigning/ehsan-elsayed/cover.svg',
    'public/speeddesigning/ehsan-elsayed/og.svg',
  ]) {
    assert.ok(existsSync(path), `${path} must exist`);
  }

  const experience = read(experiencePath);
  const experienceCss = read(`${routeRoot}/EhsanExperience.module.css`);
  const blueprint = read(blueprintPath);
  const blueprintCss = read(`${routeRoot}/blueprint/Blueprint.module.css`);
  for (const required of [
    'KNOWING', 'USING', 'The difference is a working system.',
    'ehn2Ox8YA7U', 'cngUW3Vv28k', 'BPppanxswGY',
    'Sales Techies is one expression of the system.',
    'independent speculative concept', 'prefers-reduced-motion',
  ]) assert.match(experience, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));

  assert.match(experience, /ScrollTrigger/);
  assert.match(experience, /pin:\s*true/g);
  assert.match(experience, /dir="rtl"/);
  assert.match(experience, /wideMotion:\s*['"]\(min-width:\s*768px\) and \(prefers-reduced-motion:\s*no-preference\)['"]/);
  assert.match(experience, /if \(wideMotion\)[\s\S]*scale:\s*1\.06/);
  assert.doesNotMatch(experience, /\{\s*scale:\s*1\.12/);
  assert.match(experience, /transformOrigin:\s*['"]left 48%['"]/, 'hero zoom must anchor to the left grid edge');
  assert.doesNotMatch(experience, /gsap\.fromTo\(\s*['"]\.heroCore['"]/, 'dynamic zoom must not scale the CTA and supporting copy out of frame');
  assert.match(experience, /gsap\.fromTo\(\s*['"]\.equation['"]/, 'dynamic zoom should be isolated to the headline equation');
  assert.match(experience, /className=\{`\$\{styles\.equation\} equation`\}/, 'the scoped headline must expose the GSAP equation hook');
  assert.doesNotMatch(experienceCss, /\.navbar nav a\s*\{[^}]*min-height:\s*28px/s, 'mobile navigation targets must not shrink below 44px');
  assert.match(experienceCss, /\.closing footer a\s*\{[^}]*min-height:\s*44px/s, 'creator credit must remain a 44px touch target');
  assert.match(blueprintCss, /\.footer a\s*\{[^}]*min-height:\s*44px/s, 'Blueprint creator credit must remain a 44px touch target');
  assert.match(blueprint, /canonical:\s*['"]\/speeddesigning\/ehsan-elsayed\/blueprint['"]/, 'Blueprint must expose its own canonical route');
  assert.match(blueprint, /Blueprint \| Speed Designing/, 'Blueprint must expose a distinct document title');
  assert.match(blueprint, /The Working System/);
  assert.match(blueprint, /Open the experience/);
  assert.match(read(`${routeRoot}/layout.tsx`), /canonical:\s*['"]\/speeddesigning\/ehsan-elsayed['"]/);
});

test('choreographs the Ehsan Working System intro safely', () => {
  const routeRoot = 'src/app/speeddesigning/ehsan-elsayed';
  const introPath = `${routeRoot}/WorkingSystemIntro.tsx`;
  assert.ok(existsSync(introPath), `${introPath} must exist`);

  const workingIntro = read(introPath);
  const experience = read(`${routeRoot}/EhsanExperience.tsx`);
  for (const word of ['KNOW', 'APPLY', 'BUILD', 'KNOWING', 'USING']) {
    assert.match(workingIntro, new RegExp(`>${word}<`));
  }
  assert.match(workingIntro, />STUDIO PRESENTS</);
  assert.match(workingIntro, /Skip intro/);
  assert.match(workingIntro, /prefers-reduced-motion:\s*reduce/);
  assert.match(workingIntro, /const INTRO_SAFETY_MS = 9500/);
  assert.match(workingIntro, /window\.setTimeout\(finish, INTRO_SAFETY_MS\)/);
  for (const position of ['1.15', '2.45', '3.75', '5.25', '6.25']) {
    assert.match(workingIntro, new RegExp(`, ${position.replace('.', '\\.')}`));
  }
  assert.match(workingIntro, /classList\.add\(['"]ehsan-intro-locked['"]\)/);
  assert.match(workingIntro, /classList\.remove\(['"]ehsan-intro-locked['"]\)/);
  assert.match(experience, /<WorkingSystemIntro onComplete=\{finishIntro\}\s*\/>/);
});

test('brands and stages Ehsan on every motion-enabled route mount', () => {
  const root = 'src/app/speeddesigning/ehsan-elsayed';
  const experience = read(`${root}/EhsanExperience.tsx`);
  const intro = read(`${root}/WorkingSystemIntro.tsx`);
  const css = read(`${root}/EhsanExperience.module.css`);

  assert.ok(existsSync('public/speeddesigning/brand/monogram.webp'));
  assert.ok(existsSync('public/speeddesigning/brand/compact.webp'));
  assert.match(experience, /\/speeddesigning\/brand\/monogram\.webp/);
  assert.match(intro, /\/speeddesigning\/brand\/compact\.webp/);
  assert.match(experience, /const \[pageReady, setPageReady\] = useState\(false\)/);
  assert.match(experience, /data-entry-brand/);
  assert.match(experience, /data-entry-word/);
  assert.match(experience, /data-entry-identity/);
  assert.match(experience, /gsap\.timeline\(\{ defaults: \{ ease: ['"]power3\.out['"] \} \}\)/);
  assert.match(experience, /containerAnimation:\s*notesTween/);
  assert.match(experience, /data-note-part/);
  assert.match(experience, /data-loop-track/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*\.equation\s*\{[^}]*font-size:\s*clamp\(4rem,\s*20\.5vw,\s*5\.7rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.loopTrack\s*\{[^}]*transform:\s*none/);
});

test('hands the real Ehsan hero equation out of the intro without a cut', () => {
  const root = 'src/app/speeddesigning/ehsan-elsayed';
  const experience = read(`${root}/EhsanExperience.tsx`);
  const intro = read(`${root}/WorkingSystemIntro.tsx`);
  const css = read(`${root}/EhsanExperience.module.css`);

  assert.doesNotMatch(intro, /<strong>KNOWING<\/strong><b>≠<\/b><strong>USING<\/strong>/);
  assert.match(intro, /export type IntroCompletionReason = 'handoff' \| 'skip' \| 'reduced-motion' \| 'safety'/);
  assert.match(intro, /equationRef: RefObject<HTMLHeadingElement \| null>/);
  assert.match(intro, /routeRef: RefObject<HTMLDivElement \| null>/);
  assert.match(intro, /getBoundingClientRect\(\)/);
  assert.match(intro, /const scaleCap = window\.innerWidth < 768 \? 0\.92 : 0\.68/);
  assert.match(intro, /clearProps: 'transform,opacity,visibility,willChange,color'/);
  assert.match(intro, /window\.addEventListener\('resize', finishForResize/);
  assert.match(experience, /const equationRef = useRef<HTMLHeadingElement>\(null\)/);
  assert.match(experience, /const routeRef = useRef<HTMLDivElement>\(null\)/);
  assert.match(experience, /<WorkingSystemIntro equationRef=\{equationRef\} routeRef=\{routeRef\} onComplete=\{finishIntro\}/);
  assert.match(experience, /ref=\{equationRef\}/);
  assert.match(experience, /ref=\{routeRef\}/);
  assert.match(experience, /reason === 'handoff' \? 'surroundings' : 'full'/);
  assert.match(css, /\.page\[data-intro-active='true'\] \.hero/);
});

test('gives Ehsan a one-line desktop closing and coherent interaction hooks', () => {
  const routeRoot = 'src/app/speeddesigning/ehsan-elsayed';
  const experience = read(`${routeRoot}/EhsanExperience.tsx`);
  const experienceCss = read(`${routeRoot}/EhsanExperience.module.css`);

  assert.match(experience, /<span>EHSAN<\/span>\s*\{['"]\s['"]\}\s*<span>EL SAYED<\/span>/);
  assert.match(experience, /className=\{styles\.footerMeta\}/);
  assert.match(experience, /className=\{styles\.footerSignature\}/);
  assert.match(experienceCss, /@media \(min-width:\s*481px\)[\s\S]*\.closing h2\s*\{[^}]*white-space:\s*nowrap/);
  assert.match(experienceCss, /\.primaryAction:hover/);
  assert.match(experienceCss, /\.teamPath:focus-within/);
  assert.match(experienceCss, /\.closingLinks a:focus-visible/);
});

test('keeps Ehsan Field Notes horizontal on every motion-enabled viewport', () => {
  const routeRoot = 'src/app/speeddesigning/ehsan-elsayed';
  const experience = read(`${routeRoot}/EhsanExperience.tsx`);
  const experienceCss = read(`${routeRoot}/EhsanExperience.module.css`);

  assert.match(experience, /motion:\s*['"]\(prefers-reduced-motion:\s*no-preference\)['"]/);
  assert.match(experience, /if \(!reduceMotion\)[\s\S]*root\.querySelector<HTMLElement>\(['"]\.notesTrack['"]\)/);
  assert.match(experience, /trigger:\s*['"]\.fieldNotes['"][\s\S]*pin:\s*true[\s\S]*scrub:\s*0\.8/);
  assert.doesNotMatch(experience, /if \(desktop\)[\s\S]*const notesTrack/);
  assert.match(experienceCss, /@media \(max-width:\s*1099px\)[\s\S]*\.notesTrack\s*\{[^}]*display:\s*flex/);
  assert.match(experienceCss, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.notesTrack\s*\{[^}]*display:\s*block/);
});

test('makes Ehsan discoverable through the registry and sitemap', async () => {
  const registry = await import(`${pathToFileURL(`${process.cwd()}/${registryPath}`).href}?episode=${Date.now()}`);
  const project = registry.speedDesigningProjects[0];
  assert.equal(project.slug, 'ehsan-elsayed');
  assert.equal(project.episodeNumber, 1);
  assert.equal(project.status, 'published');
  assert.equal(project.websitePath, '/speeddesigning/ehsan-elsayed');
  assert.equal(project.blueprintPath, '/speeddesigning/ehsan-elsayed/blueprint');
  const sitemap = read('src/app/sitemap.ts');
  assert.match(sitemap, /speeddesigning\/ehsan-elsayed/);
  assert.match(sitemap, /speeddesigning\/ehsan-elsayed\/blueprint/);
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
