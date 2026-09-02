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

## Nearby events

The home page can suggest three nearby Viator experiences from either a typed location or browser geolocation. Copy `.env.local.example` to `.env.local`, add the production partner key as `VIATOR_API_KEY` and the test key as `VIATOR_SANDBOX_API_KEY`. The route automatically uses the sandbox key while `VIATOR_API_BASE_URL` points at the sandbox. Change that URL to `https://api.viator.com/partner` for production.

Browser coordinates are requested only when the visitor selects **Use my location**. They are sent to the app's server and reverse-geocoded with OpenStreetMap Nominatim before the resulting place name is searched through the Viator Partner API. Postcode-style searches are also geocoded to a town or city and broadened to the surrounding area when needed. The Viator key remains server-side.

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
