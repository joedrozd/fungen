const assert = require('node:assert/strict');
const fs = require('node:fs');
const { gunzipSync } = require('node:zlib');
const { chromium } = require('C:/Users/joe_d/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const leisure = JSON.parse(fs.readFileSync('public/activities.json')).categories;
const productive = JSON.parse(fs.readFileSync('public/productive-activities.json')).categories;
const first = leisure[0].activities[0];
const privateText = 'private_location_and_search_987654';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    async function setup(fallback = false) {
      const context = await browser.newContext({
        permissions: ['clipboard-read', 'clipboard-write'],
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',
      });
      const events = [];
      const errors = [];
      let failNearby = false;
      await context.addInitScript(({ firstName }) => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
        localStorage.setItem('activity-generator-tutorial-progress', JSON.stringify({ completed: true }));
        localStorage.setItem('activity-generator-favorites', JSON.stringify([firstName, 'private_legacy_saved_123456']));
        navigator.geolocation.getCurrentPosition = (success) => success({ coords: { latitude: 51.234567, longitude: -0.123456 } });
      }, { firstName: first.name });
      await context.route('**/*', async (route) => {
        const request = route.request();
        const url = new URL(request.url());
        if (url.hostname === 'localhost') {
          if (fallback && ['/activities.json', '/productive-activities.json'].includes(url.pathname)) {
            return route.fulfill({ json: { categories: [] } });
          }
          if (url.pathname === '/api/location-search') return route.fulfill({ json: { suggestions: [] } });
          if (url.pathname === '/api/nearby-events') {
            return route.fulfill(failNearby
              ? { status: 502, json: { error: privateText } }
              : { json: { location: privateText, events: [{ id: 'private_product_123', title: privateText, productUrl: 'https://www.viator.com/private_product_123', freeCancellation: false }] } });
          }
          return route.continue();
        }
        if (url.hostname.endsWith('.posthog.com')) {
          if (request.method() === 'POST' && /\/e\/?$/.test(url.pathname)) {
            assert.equal(url.hostname, 'eu.i.posthog.com');
            let body = request.postDataBuffer();
            if (body[0] === 31 && body[1] === 139) body = gunzipSync(body);
            let raw = body.toString();
            if (raw.startsWith('data=')) {
              raw = new URLSearchParams(raw).get('data');
              if (url.searchParams.get('compression') === 'base64') raw = Buffer.from(raw, 'base64').toString();
            }
            const decoded = JSON.parse(raw);
            events.push(...(decoded.batch || (Array.isArray(decoded) ? decoded : [decoded])));
          }
          return route.fulfill({
            contentType: url.pathname.endsWith('.js') ? 'application/javascript' : 'application/json',
            headers: { 'access-control-allow-origin': '*' },
            body: url.pathname.endsWith('.js') ? '' : JSON.stringify({ status: 1, featureFlags: {}, supportedCompression: [] }),
          });
        }
        return route.abort();
      });
      const page = await context.newPage();
      page.on('pageerror', (error) => errors.push(error.message));
      const flush = () => page.waitForTimeout(3500);
      const named = (name) => events.filter((event) => event.event === name);
      return { context, page, events, errors, flush, named, failNearby: () => { failNearby = true; } };
    }
    const t = await setup();
    const { page, named, flush } = t;
    await page.goto('http://localhost:3100');
    await page.getByRole('button', { name: 'Generate new activity idea' }).click();
    await page.getByRole('button', { name: 'Copy activity to clipboard' }).click();
    await page.getByRole('radio', { name: 'Productive', exact: true }).click();
    await page.getByLabel('Filter generator by category').selectOption(productive[0].name);
    await page.getByRole('button', { name: 'Generate new activity idea' }).click();
    async function search(query) {
      await page.getByRole('button', { name: 'Open search' }).click();
      await page.getByRole('searchbox', { name: 'Search activities' }).fill(query);
      await page.getByRole('searchbox', { name: 'Search activities' }).press('Enter');
    }
    await search(first.name);
    await page.getByRole('button', { name: 'Generate new activity idea' }).click();
    await search(privateText);
    await page.getByRole('button', { name: 'Generate new activity idea' }).click();
    await page.getByRole('button', { name: 'Try it', exact: true }).click();
    await page.getByRole('group', { name: 'Recently generated activities' }).getByRole('button').first().click();
    await page.getByRole('button', { name: 'View favorites list' }).click();
    await page.getByRole('button', { name: `Select ${first.name}`, exact: true }).click();
    await page.getByRole('button', { name: 'View favorites list' }).click();
    await page.getByRole('button', { name: 'Select private_legacy_saved_123456', exact: true }).click();
    await flush();
    assert.equal(named('activity_generated').length, 3, 'empty search must not generate an event');
    const generations = named('activity_generated').map((event) => event.properties);
    assert.equal(generations[0].activity_type, 'leisure');
    assert.equal(generations[1].category_slug, productive[0].slug);
    assert.equal(generations[1].category_filter, productive[0].name);
    assert.equal(generations[2].source, 'search_results');
    assert.equal(generations[2].activity_type, 'leisure', 'search result type must not inherit productive filter');
    assert.equal(generations[2].activity_slug, first.slug);
    assert.ok(generations.every((event) => event.activity_slug && event.category_name && event.category_slug));
    assert.equal(named('activity_copied').length, 1);
    assert.ok(named('activity_copied')[0].properties.activity_slug);
    for (const source of ['daily_pick', 'recent_activity', 'favorites']) {
      assert.equal(named('activity_selected').filter((event) => event.properties.source === source).length, 1);
    }
    assert.equal(named('activity_viewed').length, 7, 'three generations, search preview, daily, recent, favourite');

    await page.locator('#event-location').fill(privateText);
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await page.getByRole('link', { name: /View on Viator/ }).waitFor();
    await page.getByRole('link', { name: /View on Viator/ }).click();
    await page.getByRole('button', { name: 'Use my location' }).click();
    await page.getByRole('link', { name: /View on Viator/ }).waitFor();
    t.failNearby();
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await page.getByText(privateText, { exact: true }).waitFor();
    await flush();
    assert.equal(named('nearby_events_requested').length, 3);
    assert.equal(named('nearby_events_completed').length, 2);
    assert.equal(named('nearby_events_completed')[1].properties.source, 'geolocation');
    assert.equal(named('nearby_events_failed').length, 1);
    assert.equal(named('nearby_events_failed')[0].properties.status_code, 502);
    assert.equal(named('nearby_event_clicked').length, 1);
    assert.equal(named('nearby_event_clicked')[0].properties.rank, 1);

    await page.goto(`http://localhost:3100/activities/${leisure[0].slug}`);
    await page.getByRole('button', { name: 'Try it', exact: true }).first().click();
    await page.getByRole('link', { name: first.name, exact: true }).first().click();
    await page.waitForURL(`**/${first.slug}`);
    await page.getByRole('button', { name: 'I’m doing this' }).click();
    await flush();
    assert.equal(named('category_viewed').length, 1);
    assert.equal(named('activity_started').length, 2);
    assert.equal(named('activity_viewed').filter((event) => event.properties.source === 'activity_guide').length, 1);
    await page.goBack();
    await page.getByRole('link', { name: first.name, exact: true }).first().waitFor();
    await page.goForward();
    await page.getByRole('button', { name: 'I’m doing this' }).waitFor();
    await flush();
    assert.equal(named('activity_viewed').filter((event) => event.properties.source === 'activity_guide').length, 2);
    await page.reload();
    await page.getByRole('button', { name: 'I’m doing this' }).waitFor();
    await flush();
    assert.equal(named('activity_viewed').filter((event) => event.properties.source === 'activity_guide').length, 3);
    const payloads = JSON.stringify(t.events);
    for (const forbidden of [privateText, 'private_legacy_saved_123456', 'private_product_123', '51.234567', '-0.123456']) {
      assert.ok(!payloads.includes(forbidden), `private value leaked: ${forbidden}`);
    }
    assert.equal(named('$autocapture').length, 0);
    assert.equal(named('$snapshot').length, 0);
    assert.deepEqual(t.errors, []);
    await t.context.close();

    const f = await setup(true);
    await f.page.goto('http://localhost:3100');
    await f.page.getByRole('button', { name: 'Generate new activity idea' }).click();
    await f.flush();
    assert.equal(f.named('activity_generated').length, 1);
    assert.equal(f.named('activity_generated')[0].properties.source, 'fallback');
    assert.equal(f.named('activity_generated')[0].properties.activity_slug, null);
    assert.equal(f.named('activity_viewed').length, 1);
    assert.deepEqual(f.errors, []);
    console.log(JSON.stringify({ passed: true, scenarios: ['random', 'filtered', 'search', 'empty search', 'fallback', 'copy', 'daily', 'recent', 'favourite', 'category', 'guide navigation/revisit/reload', 'start', 'nearby success/failure/click', 'private data exclusion'], events: t.events.length + f.events.length }, null, 2));
    await f.context.close();
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
