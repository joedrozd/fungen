# September SEO work and measurement

Prepared 23 September 2026. Targets below are working goals, not forecasts. The baseline figures were supplied by the site owner; they have not been independently verified in Search Console. Baseline reporting dates for the query totals still need recording. September comparison dates below assume 2026.

## Implementation and release

The local change includes:

- Homepage title: **Random Activity Generator | Free Things to Do**. H1: **Random Activity Generator**. The introduction retains the spare-hour benefit. The generator receives a small catalog from the server, so the initial HTML includes the heading, controls and category links without fetching catalog JSON in the browser. The daily pick is calculated after hydration to avoid differences between server and visitor dates.
- The first-visit tutorial is now opt-in so it does not cover the generator.
- The existing sports URL is retained, with the title/H1 **How to Join a Local Sports League as a Beginner**. The refresh includes directories, individual entry instructions, questions about costs and first visits, and a clear distinction between a session and league membership.
- One pilot at `/solo-day-out-generator`: eight curated outings away from home, indoor/outdoor and free/broader-budget filters, practical examples, and an explicit 30–60 minute scope plus travel time. The pilot has a self-canonical URL and a sitemap entry. General random-generator intent remains on the homepage.
- The homepage has a compact link to `/find-your-next-activity`. That dedicated inspiration page features the five priority pages (sports, social, collage, creative and the solo pilot), with guidance on time, energy and budget plus practical first steps. Contextual links connect the social/creative hubs, meetup guide, sports guide, collage guide and blackout-poetry guide. The solo page links back to the general generator and relevant guides.
- The solo generator emits `solo_outing_generated` with outing ID, filters and result count. This measures usage, not organic clicks; Search Console remains the source for the SEO goals.

Deployment date: **pending**. Record the deployed revision and date here before starting post-change comparisons. Local implementation does not establish that Google has crawled or indexed the change.

Validation completed locally: TypeScript passed; the production build generated all 571 pages; `node scratch/verify-seo.cjs` passed for all six inspected routes, 10 contextual links and the pilot sitemap entry. Browser checks passed for homepage leisure/productive filtering, search, and all six solo filter combinations, including free-only results and no immediate repeats. No browser errors were reported for the two generators. Lint completed with no errors and one existing raw-image warning moved with the homepage component. The browser viewport override did not take effect, so a phone-width visual check remains pending.

Search Console was signed out in the available browser. The owner instructed us to proceed with site changes and document the GSC checks. The sports query/page pairing, granular September attribution and Google URL Inspections are therefore **pending**. Treat the sports refresh as a content improvement; do not attribute query gains to it until the pairing is verified.

## Goals and review windows

| Priority | Supplied baseline | Working goal | Timing |
| --- | --- | --- | --- |
| Homepage | “random activity generator”: 763 impressions, 21 clicks, 2.75% CTR, position 7.8. “random things to do generator”: 79 impressions, 0 clicks, position 9.9. | Move the main query toward 4% CTR at comparable country/device and positions. At 763 impressions, 4% is 30.52 clicks, roughly 10 more than 21. | Review 6–8 weeks after deployment. |
| Sports | Page: 48 impressions, 0 clicks, position 7.9. “how to join local sports leagues”: 47 impressions, position 8.0. Pairing unconfirmed. | Top-five average position and first 3 clicks for the confirmed page/query. | Refresh within two weeks of 23 September (by 7 October); review the following eight weeks. |
| Solo pilot | “random solo day out generator free”: 45 impressions, 1 click, position 2.6. Current landing page unconfirmed. | 5 relevant organic clicks to the pilot; track solo-specific queries and the page separately. | Launch within 30 days (by 23 October); review first eight weeks after launch. |
| Internal links | Non-homepage pages: 510 page impressions, 2 clicks. Collage position 8.9 from 14 impressions. | Links to five priority pages; 10 non-homepage clicks per rolling 28 days. | Links within 30 days; traffic review within 90 days (by 22 December). |
| Diagnosis | Both comparison periods: 23 clicks; impressions 466 then 1,007. | Identify contributing pages/queries and verify intended content in Google’s rendering. | Within one week (by 30 September), subject to GSC access and deployment. |

Use complete comparable reporting periods. Record country, device, search type and average position alongside CTR. Low impression counts make short-term changes noisy. Do not interpret higher impressions or a blended CTR change alone as proof that a title helped or hurt.

## September comparison: what is known

| Period (inclusive) | Clicks | Impressions | Calculated CTR |
| --- | ---: | ---: | ---: |
| 27 August–8 September | 23 | 466 | 4.94% |
| 9–21 September | 23 | 1,007 | 2.28% |
| Change | 0 | +541 (+116.1%) | −2.65 percentage points |

These are two 13-day windows. Clicks were flat while impressions more than doubled. The totals cannot reveal which pages, searches, countries or devices changed. New low-CTR query exposure is one hypothesis, not a finding. The weekday mix also differs slightly.

## Pending GSC performance checks

1. Open the correct fungen.app property and use **Web** search results. Set a custom comparison: **27 August–8 September 2026** versus **9–21 September 2026**, inclusive. Keep all other filters identical, and show clicks, impressions, CTR and position. Export or save the exact filter state with the report. Google documents these dimensions in its [Performance report guidance](https://support.google.com/webmasters/answer/7576553).
2. Inspect query rows for the established general-generator searches separately from newly appearing searches. Define established as visible in the earlier window; label later-only rows “newly observed”, since an absent row need not mean literally zero demand. Compare the same queries in both periods and rank by impression change, then click change. Keep the reported total and any unaccounted difference visible; page and property aggregation differ, and query reporting may omit rows.
3. Repeat by page. For each leading contributor, apply that exact page filter and inspect its queries. Then split that page/query combination by country and device. Produce a table with query, page, country, device, clicks/impressions/CTR/position in each period and the differences. Calculate combined CTR from summed clicks divided by summed impressions; do not average CTR percentages.
4. To confirm sports pairing, filter the exact query **how to join local sports leagues**, then open **Pages**. Record whether `/activities/social/join-a-recreational-sports-league` is the receiving URL and whether other pages compete. Reverse the check with the exact page filter and inspect its queries. Preserve the evidence before claiming the sports experiment matches that demand.
5. Repeat query-to-page inspection for **random solo day out generator free**. Record the current landing page. After launch, monitor the pilot’s solo-specific queries and any overlap with the homepage; do not create extra pages for synonymous general-generator phrases.
6. For the homepage test, use exact query **random activity generator** plus homepage, then compare the same country/device segments over 6–8 weeks at similar positions. Log title deployment date and subsequent crawl date. If rank or query mix changes materially, describe the CTR result as confounded rather than attributing all of it to the title.
7. For the 28-day non-homepage goal, consistently exclude the exact canonical homepage from page reporting. Keep page-level totals separate from property-level query totals.

Pending finding table:

| Contributor | Earlier clicks / impressions / CTR / position | Later clicks / impressions / CTR / position | Country / device | Explanation supported by evidence |
| --- | --- | --- | --- | --- |
| Established generator queries | Pending | Pending | Pending | Pending |
| Newly observed queries | Pending | Pending | Pending | Pending |
| Leading non-homepage pages | Pending | Pending | Pending | Pending |

## Pending URL Inspection: homepage, inspiration page and five priority pages

Run these after the revision is publicly deployed. The solo page needs deployment before its live test can succeed.

| URL | Text and links to check in tested HTML | GSC result |
| --- | --- | --- |
| https://fungen.app/ | Random Activity Generator H1; spare-hour introduction; Generate Idea; compact inspiration page link. | Pending |
| https://fungen.app/find-your-next-activity | Find your next activity H1; choice guidance; creative, social and solo sections; all five featured page links. | Pending |
| https://fungen.app/activities/social/join-a-recreational-sports-league | Beginner H1; directory links; individual registration steps; fee/trial questions; social and meetup links. | Pending |
| https://fungen.app/activities/social | Introduction; prominent sports and solo links; activity guide links. | Pending |
| https://fungen.app/activities/creative/create-a-collage-from-magazine-cutouts | Full collage instructions; blackout-poetry and creative-hub links. | Pending |
| https://fungen.app/activities/creative | Category text; prominent collage and solo links; activity guide links. | Pending |
| https://fungen.app/solo-day-out-generator | Solo H1; 30–60 minute scope; initial outing and examples; controls; homepage and guide links. | Pending |

For each URL, record indexed status, last crawl, fetch outcome, crawl/index permission, user-declared canonical and Google-selected canonical. Run **Test live URL**, then open **View tested page** to check HTML, screenshot and resource/JavaScript issues. Verify real `<a href>` links as well as text. The live test does not establish Google's selected canonical or guarantee indexing; inspect the indexed report separately. See [Google’s URL Inspection documentation](https://support.google.com/webmasters/answer/9012289).

The old homepage rendered “Loading activities…” until browser fetching completed. That explains an incomplete plain fetch; it does not prove that Google's renderer failed. Local HTML checks demonstrate the new response contains useful text and links without JavaScript, but only GSC can confirm what Google saw.

## Sports sources checked

Checked 23 September 2026. These are provider or governing-body sources; no quoted fees are hardcoded in the guide.

- [GO Mammoth activity finder](https://www.gomammoth.co.uk/activity-finder/): sport/place, day and level filters.
- [GO Mammoth help](https://www.gomammoth.co.uk/need-help/): individual entry, upfront payment, and arranging a visit to watch.
- [England Football finder](https://find.englandfootball.com/), also linked by [Cambridgeshire FA](https://cambridgeshirefa.freshdesk.com/support/solutions/articles/7000076401-information-on-getting-involved-in-playing-football): official football opportunity search. The finder requires JavaScript.
- [England Netball booking instructions](https://help.centre.englandnetball.co.uk/wiki/spaces/EKC/pages/23592997/How+do+I+book+a+Back+to+Netball+session): session finder and booking steps.
- [England Netball new participant instructions](https://d2cx26qpfwuhvu.cloudfront.net/englandnetball/wp-content/uploads/2021/04/26181909/I-havent-been-to-an-England-Netball-session-before-1.pdf): account creation for new bookers.
- [Basketball Wales club directory](https://basketball.wales/clubs/): affiliated club list and map.
