import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BASE_URL } from "@/lib/activities";

const title = "Find Your Next Activity | Ideas for a Spare Hour";
const description = "Choose a creative project, a way to meet people or a short solo outing. Explore practical starting points, time and budget tips, and step-by-step activity guides.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${BASE_URL}/find-your-next-activity` },
  openGraph: { title, description, url: `${BASE_URL}/find-your-next-activity`, type: "website" },
  twitter: { card: "summary", title, description },
};

const choices = [
  { href: "#make-something", label: "Make something", detail: "A small creative project at home." },
  { href: "#meet-people", label: "Meet people", detail: "A shared interest or a regular game." },
  { href: "#head-out-solo", label: "Head out solo", detail: "A short change of scene on your own." },
];

export default function FindYourNextActivityPage() {
  return (
    <div className="min-h-screen flex flex-col site-scenic">
      <Navigation breadcrumb={[{ name: "Activity inspiration" }]} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-12 pt-36 space-y-8">
        <header className="scenic-intro">
          <p className="font-semibold text-primary">A good use of a spare hour</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-primary">Find your next activity</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Start with what you want from your time: something to make, a little company,
            or a change of scene. These starting points help you choose an activity and
            take the first step without planning your whole day around it.
          </p>
          <nav aria-label="Choose an activity direction" className="mt-6 grid gap-3 sm:grid-cols-3">
            {choices.map((choice) => (
              <a key={choice.href} href={choice.href} className="rounded-xl border border-border bg-white p-4 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-primary">
                <span className="font-semibold text-primary">{choice.label} <span aria-hidden="true">↓</span></span>
                <span className="mt-1 block text-sm text-muted-foreground">{choice.detail}</span>
              </a>
            ))}
          </nav>
        </header>

        <section aria-labelledby="choose-heading" className="rounded-2xl bg-white p-6 md:p-8">
          <h2 id="choose-heading" className="text-2xl font-semibold">Choose something that fits today</h2>
          <dl className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-primary">Time</dt>
              <dd className="mt-2 leading-relaxed text-muted-foreground">Count setup, travel and tidying up. With only 15 minutes, gather materials or send an enquiry. With an hour, try a small project or a nearby outing.</dd>
            </div>
            <div>
              <dt className="font-semibold text-primary">Energy</dt>
              <dd className="mt-2 leading-relaxed text-muted-foreground">Choose a quiet browse or a paper project when you want a gentle break. Pick a walk or a social session when you feel like getting out.</dd>
            </div>
            <div>
              <dt className="font-semibold text-primary">Budget</dt>
              <dd className="mt-2 leading-relaxed text-muted-foreground">Use supplies you already own or choose somewhere with free entry. For organised activities, check the full price before booking, including travel and equipment.</dd>
            </div>
          </dl>
        </section>

        <section id="make-something" aria-labelledby="creative-heading" className="scroll-mt-24 rounded-2xl border border-violet-100 bg-white p-6 md:p-8">
          <p className="text-sm font-semibold text-violet-700">For a creative break</p>
          <h2 id="creative-heading" className="mt-2 text-2xl font-semibold">Make a collage from magazine cutouts</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Choose one colour, place or mood and build a small picture around it. Collage gives you a starting point even when you do not feel like drawing: the shapes and textures are already on the page.</p>
          <div className="mt-5 rounded-xl bg-violet-50 p-4">
            <h3 className="font-semibold">Your first ten minutes</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">Gather scrap paper, old magazines, scissors and glue you already have. Pick five images or textures, then move them around on a sheet before sticking anything down. Keep the first version small enough to finish.</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Good for: time at home, a solo break, or making alongside a friend. Leave a few minutes to clear the table.</p>
          <Link href="/activities/creative/create-a-collage-from-magazine-cutouts" className="mt-5 inline-block font-semibold text-primary underline underline-offset-4">Follow the magazine collage guide</Link>
          <p className="mt-3 text-muted-foreground">Prefer a pen or a blank page? Explore more <Link href="/activities/creative" className="text-primary underline">creative activities for a spare hour</Link>, including drawing, writing and paper crafts.</p>
        </section>

        <section id="meet-people" aria-labelledby="social-heading" className="scroll-mt-24 rounded-2xl border border-emerald-100 bg-white p-6 md:p-8">
          <p className="text-sm font-semibold text-emerald-700">For a little company</p>
          <h2 id="social-heading" className="mt-2 text-2xl font-semibold">Find a local sports league you could join</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">If you want a reason to see the same people regularly, use today to look for a suitable sport and venue. The first step can be an enquiry; you do not need to arrange a whole team or play a match this afternoon.</p>
          <div className="mt-5 rounded-xl bg-emerald-50 p-4">
            <h3 className="font-semibold">Your first ten minutes</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">Pick a sport you would like to try and a day you can usually attend. Shortlist a nearby option, then ask whether it accepts individual beginners, what the full cost is and whether you can try a session or visit to watch.</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Good for: planning regular company. Joining, trial sessions and matches depend on the organiser&apos;s availability, so allow more than today&apos;s hour for the process.</p>
          <Link href="/activities/social/join-a-recreational-sports-league" className="mt-5 inline-block font-semibold text-primary underline underline-offset-4">Learn how to join a local sports league as a beginner</Link>
          <p className="mt-3 text-muted-foreground">For other ways to spend time with people, browse <Link href="/activities/social" className="text-primary underline">social activities and community ideas</Link>. A game night or a call to a friend can be a starting point too.</p>
        </section>

        <section id="head-out-solo" aria-labelledby="solo-heading" className="scroll-mt-24 rounded-2xl border border-sky-100 bg-white p-6 md:p-8">
          <p className="text-sm font-semibold text-sky-700">For a change of scene</p>
          <h2 id="solo-heading" className="mt-2 text-2xl font-semibold">Take yourself on a short outing</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Give the outing one small purpose: browse an unfamiliar library shelf, notice five details on a walk, or spend time with a few objects in a free museum. You can enjoy a little time out without building a full-day itinerary.</p>
          <div className="mt-5 rounded-xl bg-sky-50 p-4">
            <h3 className="font-semibold">Your first ten minutes</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">Choose indoor or outdoor and decide whether the activity needs to be free. Pick an idea, look up a suitable local place, and check its opening hours, access and journey time before leaving.</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Good for: 30–60 minutes at your destination, plus travel. Free options exclude transport and optional purchases.</p>
          <Link href="/solo-day-out-generator" className="mt-5 inline-block font-semibold text-primary underline underline-offset-4">Choose an idea with the solo outing generator</Link>
        </section>

        <section aria-labelledby="more-ideas-heading" className="rounded-2xl bg-muted p-6 md:p-8">
          <h2 id="more-ideas-heading" className="text-2xl font-semibold">Still deciding?</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Choose the option with the easiest first step, then give it ten minutes. You can keep going, make the activity smaller or try something else. The point is to find something that suits the time you have today.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/" className="font-semibold text-primary underline underline-offset-4">Get a random activity idea</Link>
            <Link href="/activities" className="font-semibold text-primary underline underline-offset-4">Browse all activity categories</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
