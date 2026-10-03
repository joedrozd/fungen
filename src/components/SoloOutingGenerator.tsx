"use client";

import { useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { ViatorOutingSearch } from "@/components/ViatorOutingSearch";
import { filterSoloOutings, outingThemes, type OutingBudget, type OutingSetting, type OutingThemeFilter } from "@/lib/solo-outings";

export function SoloOutingGenerator() {
  const [setting, setSetting] = useState<OutingSetting>("any");
  const [budget, setBudget] = useState<OutingBudget>("free");
  const [theme, setTheme] = useState<OutingThemeFilter>("any");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const matches = filterSoloOutings(setting, budget, theme);
  const selected = matches.find((outing) => outing.id === selectedId) ?? matches[0];
  const selectedTheme = outingThemes.find((item) => item.id === selected?.theme);

  function generate() {
    const alternatives = matches.filter((outing) => outing.id !== selected?.id);
    const pool = alternatives.length ? alternatives : matches;
    if (!pool.length) return;
    const outing = pool[Math.floor(Math.random() * pool.length)];
    setSelectedId(outing.id);
    posthog.capture("solo_outing_generated", {
      source: "solo_day_out_generator", outing_id: outing.id,
      setting_filter: setting, budget_filter: budget, theme_filter: theme, result_count: matches.length,
    });
  }

  return (
    <section aria-labelledby="solo-generator-heading" className="rounded-2xl bg-card p-6 shadow-none md:p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">The idea generator</p>
      <h2 id="solo-generator-heading" className="mt-2 text-2xl font-semibold">Choose your solo outing</h2>
      <p className="mt-2 text-muted-foreground">Set the mood, pick a place to be, and get one practical plan.</p>
      <div className="my-6 grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="outing-theme" className="mb-1 block font-medium">What sounds good?</label>
          <select id="outing-theme" value={theme} onChange={(event) => { setTheme(event.target.value as OutingThemeFilter); setSelectedId(null); }} className="w-full rounded-md border bg-white p-2">
            <option value="any">Surprise me</option>
            {outingThemes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="outing-setting" className="mb-1 block font-medium">Indoor or outdoor?</label>
          <select id="outing-setting" value={setting} onChange={(event) => { setSetting(event.target.value as OutingSetting); setSelectedId(null); }} className="w-full rounded-md border bg-white p-2">
            <option value="any">Either</option><option value="indoor">Indoor</option><option value="outdoor">Outdoor</option>
          </select>
        </div>
        <div>
          <label htmlFor="outing-budget" className="mb-1 block font-medium">Budget</label>
          <select id="outing-budget" value={budget} onChange={(event) => { setBudget(event.target.value as OutingBudget); setSelectedId(null); }} className="w-full rounded-md border bg-white p-2">
            <option value="free">Free options only</option><option value="any">Free and low-cost options</option>
          </select>
        </div>
      </div>
      <Button onClick={generate} disabled={!matches.length} className="w-full" size="lg" data-ph-event="solo_outing_generated" data-ph-source="solo_day_out_generator">Generate a solo outing</Button>
      <p className="mt-2 text-sm text-muted-foreground">{matches.length} matching ideas. Free options exclude travel and optional purchases.</p>
      <div aria-live="polite" aria-atomic="true" className="mt-5 rounded-xl border border-border bg-muted p-5">
        {selected ? (
          <>
            <p className="text-sm text-primary">{selectedId ? "Your solo outing" : "An idea to start with"}</p>
            <h3 className="mt-1 text-xl font-semibold">{selected.title}</h3>
            <p className="mt-2 text-sm font-medium">{selectedTheme?.label} · {selected.minutes} minutes · {selected.setting === "indoor" ? "Indoor" : "Outdoor"} · {selected.cost === "free" ? "Free entry or activity" : "Low cost"}</p>
            <p className="mt-3 text-foreground">{selected.plan}</p>
            <p className="mt-3 text-sm text-muted-foreground"><strong>Before you go:</strong> {selected.check}</p>
            {selected.guide && <Link href={selected.guide.href} className="mt-4 inline-block text-primary underline">{selected.guide.label}</Link>}
            {selected.viatorQuery && <ViatorOutingSearch key={selected.id} outing={selected} />}
          </>
        ) : <p>No outings match these filters. Try either setting, another theme or a wider budget.</p>}
      </div>
      <noscript><p className="mt-4">Enable JavaScript to shuffle ideas. You can still use the starting idea above and browse the full collection below.</p></noscript>
    </section>
  );
}
