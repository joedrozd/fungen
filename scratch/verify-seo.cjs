// Run after `next build`. Check the HTML Google can fetch before JavaScript runs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const routes = [
  ['/', 'Random Activity Generator', 'Generate Idea'],
  ['/activities/social/join-a-recreational-sports-league', 'How to Join a Local Sports League as a Beginner', 'Where to find UK leagues'],
  ['/activities/social', 'Social', 'how to join a local sports league as a beginner'],
  ['/activities/creative/create-a-collage-from-magazine-cutouts', 'Create a collage from magazine cutouts', 'blackout poetry with an old newspaper'],
  ['/activities/creative', 'Creative', 'making a magazine collage'],
  ['/solo-day-out-generator', 'Solo Day Out Generator', 'Browse a library shelf you usually skip'],
  ['/find-your-next-activity', 'Find your next activity', 'Choose something that fits today'],
];

function pageFile(route) {
  return path.join('.next/server/app', route === '/' ? 'index.html' : `${route.slice(1)}.html`);
}

for (const [route, heading, text] of routes) {
  const html = fs.readFileSync(pageFile(route), 'utf8');
  const withoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const headings = [...withoutScripts.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(headings.length, 1, `${route}: expected exactly one H1`);
  const headingText = headings[0][1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  assert.ok(headingText.includes(heading), `${route}: H1 text missing`);
  assert.ok(withoutScripts.includes(text), `${route}: content only in scripts or absent`);
  const canonical = route === '/' ? 'https://fungen.app' : `https://fungen.app${route}`;
  assert.ok(withoutScripts.includes(`rel="canonical" href="${canonical}"`), `${route}: wrong canonical`);
  assert.ok(!/<meta[^>]*content="[^"]*noindex/.test(withoutScripts), `${route}: noindex found`);
  if (route === '/') {
    assert.ok(withoutScripts.includes('<title>Random Activity Generator | Free Things to Do</title>'));
    assert.ok(!withoutScripts.includes('Loading activities...'));
    assert.ok(!withoutScripts.includes('id="featured-heading"'), 'Featured section still on homepage');
  }
  if (route === '/find-your-next-activity') {
    for (const [priority] of routes.slice(1, 6)) {
      assert.ok(withoutScripts.includes(`href="${priority}"`), `Missing inspiration page link: ${priority}`);
    }
  }
  console.log(`PASS initial HTML: ${route}`);
}

const categories = ['activities.json', 'productive-activities.json'].flatMap(file =>
  JSON.parse(fs.readFileSync(path.join('public', file), 'utf8')).categories
);
const knownRoutes = new Set(['/', '/activities', '/solo-day-out-generator', '/find-your-next-activity']);
for (const category of categories) {
  knownRoutes.add(`/activities/${category.slug}`);
  for (const activity of category.activities) knownRoutes.add(`/activities/${category.slug}/${activity.slug}`);
}
let checked = 0;
for (const category of categories) {
  for (const entry of [category, ...category.activities]) {
    for (const link of entry.content?.nextIdeas ?? []) {
      assert.ok(knownRoutes.has(link.href), `Broken contextual link: ${link.href}`);
      checked++;
    }
  }
}
const sitemap = fs.readFileSync('.next/server/app/sitemap.xml.body', 'utf8');
assert.ok(sitemap.includes('https://fungen.app/solo-day-out-generator'), 'Solo pilot missing from sitemap');
assert.ok(sitemap.includes('https://fungen.app/find-your-next-activity'), 'Inspiration page missing from sitemap');
console.log(`PASS ${checked} contextual links and new page sitemap entries`);
