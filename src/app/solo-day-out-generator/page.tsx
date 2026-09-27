import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SoloOutingGenerator } from "@/components/SoloOutingGenerator";
import { soloOutings } from "@/lib/solo-outings";
import { BASE_URL } from "@/lib/activities";

const title = "Solo Day Out Generator | Free Short Outing Ideas";
const description = "Pick a random solo outing for 30–60 minutes. Use the free generator to choose indoor or outdoor ideas, filter for free options and plan a little time for yourself.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: `${BASE_URL}/solo-day-out-generator` },
  openGraph: { title, description, url: `${BASE_URL}/solo-day-out-generator`, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function SoloDayOutPage() {
  const examples = [soloOutings[1], soloOutings[4], soloOutings[3]];
  return (
    <div className="min-h-screen flex flex-col site-scenic">
      <Navigation breadcrumb={[{ name: "Solo outings" }]} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-12 pt-36 space-y-6">
        <header className="scenic-intro">
          <p className="font-semibold text-primary">A little time for yourself</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-primary">Solo Day Out Generator</h1>
          <p className="mt-4 text-lg text-muted-foreground">Pick a random solo outing with this free tool. Each idea lasts about 30–60 minutes at your destination: a small part of your day out, not a full-day itinerary. Allow extra time to get there and back.</p>
        </header>
        <SoloOutingGenerator />
        <section className="rounded-2xl bg-white p-6" aria-labelledby="examples-heading">
          <h2 id="examples-heading" className="text-2xl font-semibold">What could an hour on your own look like?</h2>
          <div className="mt-5 space-y-5">
            {examples.map((outing) => (
              <article key={outing.id}>
                <h3 className="font-semibold text-lg">{outing.title}</h3>
                <p className="text-sm text-primary">{outing.minutes} minutes · {outing.setting} · {outing.cost === "free" ? "Choose free entry" : "Budget for a drink"}</p>
                <p className="mt-2 text-muted-foreground">{outing.plan}</p>
                <p className="mt-2 text-sm text-muted-foreground">{outing.check}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="rounded-2xl bg-white p-6 space-y-4" aria-labelledby="solo-questions">
          <h2 id="solo-questions" className="text-2xl font-semibold">Before you head out</h2>
          <h3 className="font-semibold">Is the generator free?</h3>
          <p>Yes, and the default filter shows ideas with no required activity or admission charge when you choose a suitable venue. Transport, parking and optional food or supplies can still cost money.</p>
          <h3 className="font-semibold">Will it find a venue near me?</h3>
          <p>These are outing ideas, not live venue listings. Look up a suitable local place, check access and opening hours, and make any required booking yourself.</p>
          <h3 className="font-semibold">What if the weather changes?</h3>
          <p>Switch to indoor ideas and try a public library, a free museum room or a gallery. Check that your chosen venue is open before leaving.</p>
          <p>For ideas at home or with other people, use the <Link href="/" className="text-primary underline">random activity generator</Link>. For a creative afternoon, try the <Link href="/activities/creative/create-a-collage-from-magazine-cutouts" className="text-primary underline">magazine collage guide</Link>, or explore <Link href="/activities/social" className="text-primary underline">social activities</Link> when you want company.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
