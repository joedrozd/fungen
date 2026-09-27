"use client";

import { useState, useEffect, useMemo } from "react";
import { Analytics } from "@vercel/analytics/next";
import posthog from "posthog-js";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Coffee, Copy, RotateCw, Sparkles, X } from "lucide-react";
import { Tutorial } from "@/components/Tutorial";
import { RatingWidget } from "@/components/RatingWidget";
import { SocialShare } from "@/components/SocialShare";
import { BackToTop } from "@/components/BackToTop";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NearbyEvents } from "@/components/NearbyEvents";
import { ActivityHeroFallback } from "@/components/ActivityHeroFallback";
import { useToast } from "@/components/Toast";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { trackActivity, type ActivityTrackingData } from "@/lib/activity-analytics";
import type { ActivityMeta, HowToStep } from "@/lib/activities";
import styles from "./HomeGenerator.module.css";

type GeneratorActivity = {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  meta?: ActivityMeta;
  steps?: HowToStep[];
};
type ActivityChoice = GeneratorActivity & ActivityTrackingData;
export type GeneratorCategory = {
  name: string;
  slug?: string;
  activities: Array<GeneratorActivity | string>;
};

export function HomeGenerator({ leisureCategories, productiveCategories }: {
  leisureCategories: GeneratorCategory[];
  productiveCategories: GeneratorCategory[];
}) {
  const [activeType, setActiveType] = useState<"leisure" | "productive">("leisure");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeWindow, setTimeWindow] = useState("any");
  const [setting, setSetting] = useState("any");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<ActivityChoice | null>(null);
  const [activityOfTheDay, setActivityOfTheDay] = useState<ActivityChoice | null>(null);
  const { preferences, addRecentActivity } = useUserPreferences();
  const { showToast } = useToast();

  useEffect(() => {
    setActiveType(preferences.defaultActivityType);
    setSelectedCategory("all");
  }, [preferences.defaultActivityType]);

  const activityCatalog = useMemo<ActivityChoice[]>(() => {
    const withContext = (categories: GeneratorCategory[], kind: "leisure" | "productive") =>
      categories.flatMap((category) => category.activities.map((item) => ({
        ...(typeof item === "string" ? { name: item } : item),
        kind, categoryName: category.name, categorySlug: category.slug,
      })));
    return [...withContext(leisureCategories, "leisure"), ...withContext(productiveCategories, "productive")];
  }, [leisureCategories, productiveCategories]);

  const matches = useMemo(() => activityCatalog.filter((item) => {
    if (searchQuery) return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return item.kind === activeType &&
      (selectedCategory === "all" || item.categoryName === selectedCategory) &&
      (timeWindow === "any" || (item.meta && (timeWindow === "long" ? item.meta.timeMinutes > 60 : item.meta.timeMinutes <= Number(timeWindow)))) &&
      (setting === "any" || (item.meta && item.meta.indoor === (setting === "indoor")));
  }), [activityCatalog, activeType, selectedCategory, timeWindow, setting, searchQuery]);

  // Render a real catalog idea on the first visit, including without JavaScript.
  const activity = selectedActivity ?? matches.find((item) => item.slug === "try-forest-bathing-shinrin-yoku") ?? matches[0] ?? null;
  const currentCategories = activeType === "leisure" ? leisureCategories : productiveCategories;

  useEffect(() => {
    if (!activityCatalog.length) return;
    const now = new Date();
    const seed = now.getFullYear() * 372 + now.getMonth() * 31 + now.getDate();
    setActivityOfTheDay(activityCatalog[seed % activityCatalog.length]);
  }, [activityCatalog]);

  function selectActivity(selected: ActivityChoice, source: string) {
    setSelectedActivity(selected);
    trackActivity("activity_selected", selected, source);
    trackActivity("activity_viewed", selected, source);
    addRecentActivity(selected.name);
  }

  function generateActivity() {
    if (!matches.length) return;
    const alternatives = matches.filter((item) => item.name !== activity?.name);
    const pool = alternatives.length ? alternatives : matches;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    const source = searchQuery ? "search_results" : "generator";
    setSelectedActivity(selected);
    trackActivity("activity_generated", selected, source, { category_filter: selectedCategory });
    trackActivity("activity_viewed", selected, source);
    addRecentActivity(selected.name);
  }

  function resetSelection() {
    setSelectedActivity(null);
    setSearchQuery("");
  }

  function handleSearch(query: string) {
    setSearchQuery(query.trim());
    setSelectedActivity(null);
    const results = activityCatalog.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));
    posthog.capture("activities_searched", { source: "generator", result_count: results.length });
    if (results[0]) trackActivity("activity_viewed", results[0], "search_preview");
  }

  function selectRecent(name: string) {
    const selected = activityCatalog.find((item) => item.name === name);
    if (selected) selectActivity(selected, "recent_activity");
    else setSelectedActivity({ name });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copyActivity() {
    if (!activity) return;
    try {
      await navigator.clipboard.writeText(activity.name);
      showToast("Activity copied to clipboard!", "success");
      trackActivity("activity_copied", activity, "generator");
    } catch {
      showToast("Couldn't copy to clipboard", "error");
    }
  }

  return (
    <div className={`${styles.page} site-scenic`}>
      <Analytics />
      <Navigation onSearch={handleSearch} />
      <main className={styles.main} id="main-content">
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Make room for something new.</p>
          <h1>Random Activity Generator</h1>
          <p>Find something to do with your next hour. A quiet moment, a creative detour,
            or a small step forward — let curiosity lead the way.</p>
        </header>

        <div className={styles.workspace}>
          <aside className={styles.sidebar} aria-label="Activity generator preferences">
            <div className={styles.filters}>
              <fieldset>
                <legend className={styles.label}>Your intention</legend>
                <div className={styles.segmented}>
                  {(["leisure", "productive"] as const).map((type) => (
                    <button key={type} type="button" aria-pressed={activeType === type}
                      onClick={() => {
                        setActiveType(type); setSelectedCategory("all"); resetSelection();
                        posthog.capture("activity_type_changed", { activity_type: type, source: "generator" });
                      }}>
                      {type === "leisure" ? "Take a break" : "Make progress"}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className={styles.label}>Explore a category</legend>
                <div className={styles.categoryGrid}>
                  {[{ name: "Anything", value: "all" }, ...currentCategories.map((category) => ({ name: category.name, value: category.name }))].map((category) => (
                    <button key={category.value} type="button" className={styles.choice}
                      aria-pressed={selectedCategory === category.value}
                      onClick={() => {
                        setSelectedCategory(category.value); resetSelection();
                        posthog.capture("activity_category_changed", { category_filter: category.value, activity_type: activeType, source: "generator" });
                      }}>{category.name}</button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className={styles.label}>Time window</legend>
                <div className={styles.timeGrid}>
                  {[['any', 'Any time'], ['30', '≤ 30 min'], ['60', '≤ 1 hour'], ['long', '1+ hours']].map(([value, label]) => (
                    <button key={value} type="button" className={styles.choice} aria-pressed={timeWindow === value}
                      onClick={() => { setTimeWindow(value); resetSelection(); }}>{label}</button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className={styles.label}>Your setting</legend>
                <div className={styles.pills}>
                  {[["any", "Anywhere"], ["indoor", "Indoors"], ["outdoor", "Outdoors"]].map(([value, label]) => (
                    <button key={value} type="button" className={styles.choice} aria-pressed={setting === value}
                      onClick={() => { setSetting(value); resetSelection(); }}>{label}</button>
                  ))}
                </div>
              </fieldset>

              <div>
                <button type="button" className={styles.generate} onClick={generateActivity} disabled={!matches.length}
                  data-ph-event="activity_generated" data-ph-source={searchQuery ? "search_results" : "generator"}>
                  <Sparkles size={18} aria-hidden="true" /> Generate Idea
                </button>
                <p className={styles.matchCount} aria-live="polite">{matches.length} possibilities to explore</p>
                <noscript><p>Enable JavaScript to generate a random idea, or explore the activity guides below.</p></noscript>
              </div>
            </div>
            <Link href="/activities" className={styles.browse}>Browse all activity guides <ArrowRight size={15} aria-hidden="true" /></Link>
            {activityOfTheDay && <button type="button" className={styles.dailyPick} onClick={() => {
              selectActivity(activityOfTheDay, "daily_pick"); window.scrollTo({ top: 0, behavior: "smooth" });
            }}><span className={styles.label}><Sparkles size={14} aria-hidden="true" /> Activity of the Day</span><span>{activityOfTheDay.name}</span><ArrowRight size={16} aria-hidden="true" /></button>}
            {preferences.recentActivities.length > 0 && <section className={styles.recent} aria-label="Recently generated activities">
              <h2 className={styles.label}>Recently explored</h2>
              <ul>{preferences.recentActivities.slice(0, 5).map((recent) => <li key={recent}><button type="button" onClick={() => selectRecent(recent)}>{recent}<ArrowRight size={13} aria-hidden="true" /></button></li>)}</ul>
            </section>}
          </aside>

          <div className={styles.resultColumn}>
            {searchQuery && (
              <div className={styles.searchNotice}>
                <p>{matches.length} results for “{searchQuery}” <span>across all categories</span></p>
                <button type="button" onClick={resetSelection} aria-label="Clear search"><X size={17} /></button>
              </div>
            )}
            <article className={styles.result} aria-label="Suggested activity">
              {activity ? (
                <>
                  <div className={styles.metadata}>
                    <span>{activity.categoryName || "Recently explored"}{activity.meta && ` · ${activity.meta.indoor ? "Indoors" : "Outdoors"}`}</span>
                    {activity.meta && <span>Est. {activity.meta.timeMinutes} min</span>}
                  </div>
                  <div className={styles.photo}>
                    {activity.image ? (
                      <Image src={activity.image} alt={activity.name} fill priority={!selectedActivity}
                        sizes="(min-width: 1200px) 544px, (min-width: 900px) 50vw, 90vw" />
                    ) : (
                      <ActivityHeroFallback categorySlug={activity.categorySlug || "outdoor"} activitySlug={activity.slug || activity.name} className={styles.fallback} />
                    )}
                  </div>
                  <div className={styles.activityCopy} aria-live="polite" aria-atomic="true">
                    <h2>{activity.name}</h2>
                    {activity.description && <p>{activity.description}</p>}
                  </div>
                  {!!activity.steps?.length && (
                    <section className={styles.prompts} aria-label="Getting started">
                      <h3 className={styles.label}>A few first steps</h3>
                      <ol>{activity.steps.map((step, index) => (
                        <li key={step.step}><span className={styles.stepNumber}>{index + 1}</span><div><h4>{step.step}</h4><p>{step.detail}</p></div></li>
                      ))}</ol>
                    </section>
                  )}
                  {activity.meta && (
                    <section className={styles.gear} aria-label="What you need">
                      <h3 className={styles.label}>Bring along</h3>
                      <div className={styles.tags}>{(activity.meta.equipment.length ? activity.meta.equipment : ["Just yourself"]).map((item) => <span key={item}>{item}</span>)}</div>
                    </section>
                  )}
                  {activity.slug && activity.categorySlug && (
                    <Link href={`/activities/${activity.categorySlug}/${activity.slug}`} className={styles.guide}>Read the full activity guide <ArrowRight size={15} aria-hidden="true" /></Link>
                  )}
                </>
              ) : (
                <div className={styles.empty}>
                  <Sparkles size={28} aria-hidden="true" />
                  <h2>A little more room to explore.</h2>
                  <p>No activities match {searchQuery ? "this search" : "these preferences"}. Try a different category or a wider time window.</p>
                  <button type="button" className={styles.choice} onClick={() => {
                    setSelectedCategory("all"); setTimeWindow("any"); setSetting("any"); resetSelection();
                  }}>Reset filters</button>
                </div>
              )}
              <div className={styles.actions}>
                <button type="button" className={styles.roll} onClick={generateActivity} disabled={!matches.length}>
                  <RotateCw size={15} aria-hidden="true" /> Roll another
                </button>
              </div>
              {activity && <section className={styles.moreActions} aria-label="Rate, copy and share this activity">
                <h3 className={styles.label}>Make it yours</h3>
                <div className={styles.feedback}>
                  <RatingWidget key={activity.name} activity={activity.name} />
                  <button type="button" onClick={copyActivity} className={styles.copy}><Copy size={15} aria-hidden="true" /> Copy idea</button>
                  <SocialShare activity={activity.name} />
                </div>
              </section>}
            </article>
          </div>
        </div>

        <section className={styles.extras} aria-label="More inspiration">
          <div className={styles.extraHeading}><span className={styles.label}>Keep exploring</span><span>A good day starts with a small idea.</span></div>
          <NearbyEvents />
        </section>
      </main>
      <BackToTop />
      <Tutorial />
      <a href="https://paypal.me/JDrozd?country.x=GB&locale.x=en_GB" target="_blank" rel="noopener noreferrer" className={styles.support} aria-label="Support the developer">
        <Coffee size={17} aria-hidden="true" /><span>Buy me a coffee</span>
      </a>
      <Footer />
    </div>
  );
}
