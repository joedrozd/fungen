import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SoloOutingGenerator } from "@/components/SoloOutingGenerator";
import { ViatorOutingSearch } from "@/components/ViatorOutingSearch";
import { outingThemes, soloOutings } from "@/lib/solo-outings";
import { soloThemeGuides } from "@/lib/solo-theme-guides";
import { BASE_URL } from "@/lib/activities";

const title = `Solo Day Out Generator | ${soloOutings.length} Short Outing Ideas`;
const description = `Explore ${soloOutings.length} solo outing ideas for 30–60 minutes. Browse art, nature, local exploring, quiet breaks, learning and movement, or generate a free or low-cost plan.`;
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: `${BASE_URL}/solo-day-out-generator` },
  openGraph: { title, description, url: `${BASE_URL}/solo-day-out-generator`, type: "website" },
  twitter: { card: "summary", title, description },
};

const themedOutings = outingThemes.map((theme) => ({
  ...theme,
  outings: soloOutings.filter((outing) => outing.theme === theme.id),
}));

export default function SoloDayOutPage() {
  return (
    <div className="min-h-screen flex flex-col site-scenic">
      <Navigation breadcrumb={[{ name: "Solo outings" }]} />
      <main className="mx-auto w-full max-w-5xl flex-1 space-y-8 px-4 pb-16 pt-36">
        <header className="scenic-intro">
          <p className="font-semibold text-primary">A little time for yourself</p>
          <h1 className="mt-2 text-3xl font-semibold text-primary md:text-5xl">Solo Day Out Generator</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">A day out on your own can start small. Choose from {soloOutings.length} ideas for art, fresh air, exploring, learning, movement and slower moments. Each plan takes about 30–60 minutes at your destination. Add travel time and stay longer if you like.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm font-medium text-primary">
            <span className="rounded-full bg-primary/10 px-3 py-1.5">{soloOutings.length} outing ideas</span>
            <span className="rounded-full bg-primary/10 px-3 py-1.5">{outingThemes.length} ways to explore</span>
            <span className="rounded-full bg-primary/10 px-3 py-1.5">30–60 minutes each</span>
          </div>
        </header>

        <SoloOutingGenerator />

        <section className="rounded-2xl bg-white p-6 md:p-8" aria-labelledby="themes-heading">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Browse by mood</p>
          <h2 id="themes-heading" className="mt-2 text-2xl font-semibold md:text-3xl">Where do you want to begin?</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">Pick a theme to see every plan, including ideas that the free-only generator filter leaves out. Every outing has a simple first step and something to check before you leave.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {themedOutings.map((theme, index) => (
              <a key={theme.id} href={`#${theme.id}-outings`} className="group rounded-xl border border-border bg-muted/50 p-5 transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">0{index + 1} / {theme.outings.length} ideas</span>
                <h3 className="mt-2 text-lg font-semibold group-hover:text-primary">{theme.label} <span aria-hidden="true">↗</span></h3>
                <p className="mt-2 text-sm text-muted-foreground">{theme.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 md:p-8" aria-labelledby="how-to-heading">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Make it easy</p>
          <h2 id="how-to-heading" className="mt-2 text-2xl font-semibold md:text-3xl">A small plan is enough</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="border-l-2 border-primary/40 pl-4"><h3 className="font-semibold">1. Choose a feeling</h3><p className="mt-1 text-sm text-muted-foreground">Want to move, notice something new or simply pause? Pick a theme, then choose the idea that feels easiest to start.</p></div>
            <div className="border-l-2 border-primary/40 pl-4"><h3 className="font-semibold">2. Find a real place</h3><p className="mt-1 text-sm text-muted-foreground">These are plans, not live venue listings. Look up a public place near you and check its opening hours, access and any booking rules.</p></div>
            <div className="border-l-2 border-primary/40 pl-4"><h3 className="font-semibold">3. Set your budget</h3><p className="mt-1 text-sm text-muted-foreground">Free means the activity can be done without a required admission or purchase at a suitable place. Check transport, parking and optional food separately.</p></div>
            <div className="border-l-2 border-primary/40 pl-4"><h3 className="font-semibold">4. Keep the return simple</h3><p className="mt-1 text-sm text-muted-foreground">Allow time to get there and back. For outdoor plans, check the forecast, daylight and route conditions, and choose a comfortable alternative when needed.</p></div>
          </div>
        </section>

        <section aria-labelledby="all-outings-heading" className="space-y-5">
          <div className="rounded-2xl bg-white p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">The full collection</p>
            <h2 id="all-outings-heading" className="mt-2 text-2xl font-semibold md:text-3xl">All {soloOutings.length} solo outing ideas</h2>
            <p className="mt-2 text-muted-foreground">Open any idea for a 30–60 minute plan and a useful check before you go.</p>
          </div>
          {themedOutings.map((theme, themeIndex) => (
            <div key={theme.id} id={`${theme.id}-outings`} className="scroll-mt-28 rounded-2xl bg-white p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">Theme 0{themeIndex + 1} / 06</p>
                  <h3 className="mt-1 text-2xl font-semibold">{theme.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{theme.description}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{theme.outings.length} ideas</span>
              </div>
              <div className="mt-5 rounded-xl border border-border bg-primary/5 p-5">
                <h4 className="text-lg font-semibold">{soloThemeGuides[theme.id].heading}</h4>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{soloThemeGuides[theme.id].paragraphs[0]}</p>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {theme.outings.map((outing) => (
                  <details key={outing.id} className="group self-start rounded-xl border border-border bg-muted/40 open:bg-white md:open:col-span-2">
                    <summary className="cursor-pointer px-4 py-4 font-semibold marker:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      {outing.title}
                      <span className="mt-1 block text-sm font-normal text-muted-foreground">{outing.minutes} min · {outing.setting === "indoor" ? "Indoor" : "Outdoor"} · {outing.cost === "free" ? "Free activity" : "Low cost"}{outing.viatorQuery && " · Guided option"}</span>
                    </summary>
                    <div className="border-t border-border px-4 pb-4 pt-3 text-sm leading-relaxed">
                      <p>{outing.plan}</p>
                      <p className="mt-3 text-muted-foreground"><strong className="text-foreground">Before you go:</strong> {outing.check}</p>
                      {outing.guide && <Link href={outing.guide.href} className="mt-3 inline-block font-medium text-primary underline underline-offset-4">{outing.guide.label}</Link>}
                      {outing.viatorQuery && <ViatorOutingSearch outing={outing} />}
                    </div>
                  </details>
                ))}
              </div>
              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
                {soloThemeGuides[theme.id].paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-6 rounded-xl bg-muted/50 p-5">
                <h4 className="font-semibold">More ways to try {theme.label.toLowerCase()}</h4>
                <ul className="mt-3 grid list-disc gap-x-8 gap-y-2 pl-5 text-sm leading-6 text-muted-foreground md:grid-cols-2">
                  {soloThemeGuides[theme.id].ideas.map((idea) => <li key={idea}>{idea}</li>)}
                </ul>
              </div>
              <a href="#themes-heading" className="mt-5 inline-block text-sm font-medium text-primary underline underline-offset-4">Back to themes</a>
            </div>
          ))}
        </section>

        <section className="rounded-2xl bg-white p-6 md:p-8" aria-labelledby="solo-questions">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Good to know</p>
          <h2 id="solo-questions" className="mt-2 text-2xl font-semibold md:text-3xl">Solo outing questions</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div><h3 className="font-semibold">Is the generator free?</h3><p className="mt-2 text-sm text-muted-foreground">Yes. The default filter shows outings with no required activity or admission charge when you choose a suitable venue. Transport, parking and optional food or supplies can still cost money.</p></div>
            <div><h3 className="font-semibold">Will it find a venue near me?</h3><p className="mt-2 text-sm text-muted-foreground">These are outing ideas rather than live venue listings. Search for a local place that fits the plan, then confirm its opening hours, accessibility, entry fees and booking requirements.</p></div>
            <div><h3 className="font-semibold">What if the weather changes?</h3><p className="mt-2 text-sm text-muted-foreground">Choose “Indoor” in the generator. A library, free gallery, museum room or covered public space can work well when outdoor conditions change.</p></div>
            <div><h3 className="font-semibold">What if I only have a short window?</h3><p className="mt-2 text-sm text-muted-foreground">Start with a 30-minute idea close to home, such as noticing street details, browsing a bookshop or taking a gentle walking loop. The listed time is at the destination; include travel in your own schedule.</p></div>
            <div><h3 className="font-semibold">Do I have to go somewhere unfamiliar?</h3><p className="mt-2 text-sm text-muted-foreground">No. Several plans use a familiar park, street or library and give you a fresh way to notice it. Choose places and routes where you feel comfortable.</p></div>
            <div><h3 className="font-semibold">Can I adapt an idea for access needs?</h3><p className="mt-2 text-sm text-muted-foreground">Yes. Swap a walk for a seated version, shorten the route or choose an indoor venue. Check step-free access, seating, toilets and other details with the venue before travelling.</p></div>
          </div>
          <p className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground">For ideas at home or with other people, use the <Link href="/" className="text-primary underline underline-offset-4">random activity generator</Link>. For a creative afternoon, try the <Link href="/activities/creative/create-a-collage-from-magazine-cutouts" className="text-primary underline underline-offset-4">magazine collage guide</Link>, or explore <Link href="/activities/social" className="text-primary underline underline-offset-4">social activities</Link> when you want company.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
