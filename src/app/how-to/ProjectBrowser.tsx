"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectSummary } from "@/lib/home-projects";
import type { HowToPhoto } from "@/lib/how-to-photos";
import { ProjectCard } from "./ProjectCard";
import styles from "./how-to.module.css";

type ProjectGroup = {
  id: string;
  name: string;
  description: string;
  photo: HowToPhoto;
  guides: ProjectSummary[];
};

type Filters = { q: string; topic: string; level: string; time: string };
const emptyFilters: Filters = { q: "", topic: "", level: "", time: "" };
const searchStopWords = new Set(["a", "an", "and", "can", "do", "for", "from", "how", "i", "my", "of", "the", "to", "with"]);

export function ProjectBrowser({ groups }: { groups: ProjectGroup[] }) {
  const [filters, setFilters] = useState(emptyFilters);
  const [ready, setReady] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function readFilters() {
      const saved = window.history.state?.howToFilters as Filters | undefined;
      setFilters(saved ?? emptyFilters);
    }

    readFilters();
    setReady(true);
    window.addEventListener("popstate", readFilters);
    return () => window.removeEventListener("popstate", readFilters);
  }, []);

  function updateFilters(next: Filters) {
    setFilters(next);
    // Restore the filter when readers go back without putting their search text in analytics URLs.
    const { pathname, search } = window.location;
    window.history.replaceState({ ...window.history.state, howToFilters: next }, "", pathname + search);
  }

  function resetFilters() {
    updateFilters(emptyFilters);
    searchInput.current?.focus();
  }

  const words = (filters.q.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])
    .filter((word) => !searchStopWords.has(word));
  const filtered = groups
    .filter((group) => !filters.topic || group.id === filters.topic)
    .map((group) => ({
      ...group,
      guides: group.guides.filter((guide) => {
        if (filters.level && filters.level !== guide.level) return false;
        if (filters.time === "long" && guide.minutes <= 60) return false;
        if (filters.time && filters.time !== "long" && guide.minutes > Number(filters.time)) return false;
        return words.every((word) => guide.searchText.includes(word));
      }),
    }))
    .filter((group) => group.guides.length > 0);

  const count = filtered.reduce((total, group) => total + group.guides.length, 0);
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <section id="guide-library" tabIndex={-1} className={styles.library} aria-labelledby="library-heading">
      <div className={styles.filterPanel}>
        <div className={styles.libraryHeading}>
          <div>
            <h2 id="library-heading">Find a guide</h2>
            <p>Search by task or filter the list. Hands-on time excludes waiting for things to dry, set or grow.</p>
          </div>
          <p role="status" className={styles.resultCount}>
            {count} {count === 1 ? "guide" : "guides"}{hasFilters ? " found" : ""}
          </p>
        </div>
        <fieldset disabled={!ready} className={styles.filters}>
          <legend className="sr-only">Filter home guides</legend>
          <div className={styles.searchField}>
            <label htmlFor="guide-search">Search guides</label>
            <div className={styles.searchInput}>
              <Search size={18} aria-hidden="true" />
              <input
                ref={searchInput}
                id="guide-search"
                type="search"
                placeholder="Try “drawer” or “sewing”"
                value={filters.q}
                onChange={(event) => updateFilters({ ...filters, q: event.target.value })}
              />
              {filters.q && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    updateFilters({ ...filters, q: "" });
                    searchInput.current?.focus();
                  }}
                >
                  <X size={17} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <div className={styles.topicField}>
            <label htmlFor="guide-topic">Topic</label>
            <select id="guide-topic" value={filters.topic} onChange={(event) => updateFilters({ ...filters, topic: event.target.value })}>
              <option value="">All topics</option>
              {groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="guide-level">Skill level</label>
            <select id="guide-level" value={filters.level} onChange={(event) => updateFilters({ ...filters, level: event.target.value })}>
              <option value="">Any level</option>
              <option value="Beginner">Beginner</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="guide-time">Hands-on time</label>
            <select id="guide-time" value={filters.time} onChange={(event) => updateFilters({ ...filters, time: event.target.value })}>
              <option value="">Any time</option>
              <option value="30">Up to 30 min</option>
              <option value="60">Up to 1 hour</option>
              <option value="long">Over 1 hour</option>
            </select>
          </div>
        </fieldset>
        {hasFilters && (
          <Button type="button" size="sm" variant="outline" className="mt-4 min-h-10" onClick={resetFilters}>
            Clear filters
          </Button>
        )}
        <noscript>
          <p className="mt-3 text-sm text-muted-foreground">You can browse every guide below. Search and filters require JavaScript.</p>
        </noscript>
      </div>

      {filtered.map((group) => (
        <section key={group.id} id={group.id} className={styles.topic} aria-labelledby={`${group.id}-heading`}>
          <div className={styles.topicHeader}>
            <div className={styles.topicPhoto}>
              <Image src={group.photo.src} alt="" fill sizes="(max-width: 470px) 64px, 104px" style={{ objectPosition: group.photo.position }} />
            </div>
            <div>
              <h3 id={`${group.id}-heading`}>{group.name}</h3>
              <p>{group.description}</p>
            </div>
            <span>{group.guides.length} {group.guides.length === 1 ? "guide" : "guides"}</span>
          </div>
          <ul className={styles.projectGrid}>
            {group.guides.map((guide) => <ProjectCard key={guide.id} project={guide} heading="h4" anchor />)}
          </ul>
        </section>
      ))}
      {count === 0 && (
        <div className={styles.emptyState}>
          <Search size={24} aria-hidden="true" />
          <h3>No guides match</h3>
          <p>Try a shorter search or choose a wider topic, skill level or time window.</p>
        </div>
      )}
    </section>
  );
}
