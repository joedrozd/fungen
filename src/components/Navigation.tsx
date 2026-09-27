"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Zap } from "lucide-react";
import { SearchBar } from "./SearchBar";

interface NavigationProps {
  onSearch?: (query: string) => void;
  breadcrumb?: { name: string; href?: string }[];
}

const categoryGroups = {
  Leisure: [["Outdoor", "outdoor"], ["Creative", "creative"], ["Learning", "learning"], ["Food & Drink", "food-drink"], ["Mindfulness", "mindfulness"], ["Social", "social"], ["Games", "games"]],
  Productive: [["Career Development", "career-development"], ["Organization", "organization"], ["Skills", "skills"], ["Financial", "financial"], ["Personal Growth", "personal-growth"], ["Home Improvement", "home-improvement"], ["Health & Fitness", "health-fitness"]],
};

export function Navigation({ onSearch, breadcrumb }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categoryButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) { setMenuOpen(false); setActiveCategory(null); }
    };
    document.addEventListener("mousedown", closeOutside);
    return () => document.removeEventListener("mousedown", closeOutside);
  }, []);

  return (
    <header ref={navigationRef} className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButtonRef.current?.focus(); }
      if (event.key === "Escape" && activeCategory) { setActiveCategory(null); categoryButtonRef.current?.focus(); }
    }}>
      <div className="site-nav">
        <Link href="/" className="site-brand" aria-label="Fungen — Activity Generator home">
          <Zap size={18} strokeWidth={1.5} aria-hidden="true" />
          <span>Fungen <span aria-hidden="true">{"//"}</span> <span className="site-brand-descriptor">Activity generator</span></span>
        </Link>
        <nav className="site-nav-links" aria-label="Main navigation">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Generate</Link>
          <Link href="/activities" aria-current={pathname.startsWith("/activities") ? "page" : undefined}>Discover</Link>
          {Object.entries(categoryGroups).map(([name, categories]) => <div className="site-category-menu" key={name}>
            <button type="button" aria-expanded={activeCategory === name} aria-controls={`categories-${name}`} onClick={(event) => {
              categoryButtonRef.current = event.currentTarget;
              setActiveCategory(activeCategory === name ? null : name);
            }}>{name}<ChevronDown size={12} aria-hidden="true" /></button>
            {activeCategory === name && <div className="site-category-dropdown" id={`categories-${name}`}>
              <p>{name} activities</p>
              {categories.map(([label, slug]) => <Link href={`/activities/${slug}`} key={slug} onClick={() => setActiveCategory(null)}>{label}</Link>)}
            </div>}
          </div>)}
        </nav>
        <div className="site-nav-tools">
          {onSearch && <SearchBar onSearch={onSearch} />}
          <button ref={menuButtonRef} type="button" className="site-icon-button site-menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="site-mobile-nav" aria-label="Mobile navigation">
        <Link href="/" onClick={() => setMenuOpen(false)}>Generate an idea</Link>
        <Link href="/activities" onClick={() => setMenuOpen(false)}>Discover all activities</Link>
        <Link href="/solo-day-out-generator" onClick={() => setMenuOpen(false)}>Plan a solo day out</Link>
        {Object.entries(categoryGroups).map(([name, categories]) => <details key={name} className="site-mobile-categories"><summary>{name} categories</summary><div>{categories.map(([label, slug]) => <Link href={`/activities/${slug}`} key={slug} onClick={() => setMenuOpen(false)}>{label}</Link>)}</div></details>)}
      </nav>}
      {breadcrumb && <nav className="site-breadcrumb" aria-label="Breadcrumb"><ol>
        <li><Link href="/">Home</Link></li>
        {breadcrumb.map((item, index) => <li key={`${item.name}-${index}`}><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}
      </ol></nav>}
    </header>
  );
}
