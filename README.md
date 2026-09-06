This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## PostHog analytics

Analytics use [PostHog EU project 267288](https://eu.posthog.com/project/267288).
Set `NEXT_PUBLIC_POSTHOG_KEY` to the project's public key and
`NEXT_PUBLIC_POSTHOG_HOST` to `https://eu.i.posthog.com` in `.env.local` and your
hosting provider. These values are bundled at build time, so redeploy after
changing them. Analytics stay disabled when the key is missing.

Following the [PostHog Next.js setup](https://posthog.com/docs/libraries/next-js),
`src/instrumentation-client.ts` initializes the SDK before the app renders.
It captures initial page views, client-side navigation, and page leaves. Explicit
events cover the following activity flows:

| Event | When it fires |
| --- | --- |
| `activity_generated` | Each successful random, filtered, search-result, or fallback generation |
| `activity_viewed` | An activity is displayed in the generator or its guide is opened |
| `activity_selected` | Daily pick, recent activity, favourite, or category guide is selected |
| `activity_started` | Category **Try it** or guide **I'm doing this** is clicked |
| `activity_copied` | The displayed catalog activity is successfully copied |
| `category_viewed` | A category page is opened |
| `activities_searched` | An activity search is submitted; records result count |
| `activity_type_changed`, `activity_category_changed` | Generator filters are selected |
| `nearby_events_requested`, `nearby_events_completed`, `nearby_events_failed` | A nearby recommendation request starts, succeeds, or fails |
| `nearby_event_clicked` | A visitor opens a Viator result |

Activity events share `activity_name`, `activity_slug`, `category_name`,
`category_slug`, `activity_type`, and `source`. `category_filter` records the
generator filter separately from the selected activity's actual category.
Fallback ideas use `null` for metadata they do not have. Saved entries are tracked
only when they still match a catalog activity; saved lists are never uploaded.
Guide views fire once per visit, including direct loads and client navigation,
without counting prefetched links or every card in a list as an activity view.

Nearby events contain only provider, request source, result count, stable failure
reason/status, or result rank. They exclude place names and product identifiers.
`data-ph-event` and `data-ph-source` mark action controls for inspection; event
handlers perform the actual captures because autocapture is disabled.
PostHog stores analytics identifiers in localStorage. Autocapture and session
recording are disabled; search text and location values are not added to events.

## Nearby events

The home page can suggest three nearby Viator experiences from either a typed location or browser geolocation. Copy `.env.local.example` to `.env.local`, add the production partner key as `VIATOR_API_KEY` and the test key as `VIATOR_SANDBOX_API_KEY`. The route automatically uses the sandbox key while `VIATOR_API_BASE_URL` points at the sandbox. Change that URL to `https://api.viator.com/partner` for production.

Browser coordinates are requested only when the visitor selects **Use my location**. They are sent to the app's server and reverse-geocoded with OpenStreetMap Nominatim before the resulting place name is searched through the Viator Partner API. Manual searches offer selectable place suggestions and are resolved to a town or city, with optional country clarification and broader-area fallback. The Viator key remains server-side.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
