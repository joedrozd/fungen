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

const primaryPages = [
  { href: "/", label: "Generate", mobileLabel: "Generate an idea" },
  { href: "/activities", label: "Discover", mobileLabel: "Discover all activities" },
  { href: "/solo-day-out-generator", label: "Solo day out", mobileLabel: "Plan a solo day out" },
  { href: "/find-your-next-activity", label: "Inspiration", mobileLabel: "Find your next activity" },
  { href: "/about", label: "About", mobileLabel: "About & FAQ" },
];

function isCurrentPage(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/activities") return pathname.startsWith(href);
  return pathname === href;
}

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
          {primaryPages.map(({ href, label }) => <Link href={href} key={href}
            onClick={() => setActiveCategory(null)}
            aria-current={isCurrentPage(pathname, href) ? "page" : undefined}>{label}</Link>)}
          <div className="site-category-menu">
            <button type="button" aria-expanded={activeCategory === "Categories"} aria-controls="categories-all" onClick={(event) => {
              categoryButtonRef.current = event.currentTarget;
              setActiveCategory(activeCategory === "Categories" ? null : "Categories");
            }}>Categories<ChevronDown size={12} aria-hidden="true" /></button>
            {activeCategory === "Categories" && <div className="site-category-dropdown" id="categories-all">
              {Object.entries(categoryGroups).map(([name, categories]) => <div key={name}>
                <p>{name} activities</p>
                {categories.map(([label, slug]) => <Link href={`/activities/${slug}`} key={slug} onClick={() => setActiveCategory(null)}>{label}</Link>)}
              </div>)}
            </div>}
          </div>
        </nav>
        <div className="site-nav-tools">
          {onSearch && <SearchBar onSearch={onSearch} />}
          <button ref={menuButtonRef} type="button" className="site-icon-button site-menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="site-mobile-nav" aria-label="Mobile navigation">
        {primaryPages.map(({ href, mobileLabel }) => <Link href={href} key={href}
          aria-current={isCurrentPage(pathname, href) ? "page" : undefined}
          onClick={() => setMenuOpen(false)}>{mobileLabel}</Link>)}
        <p className="site-mobile-section-label">Explore by category</p>
        {Object.entries(categoryGroups).map(([name, categories]) => <details key={name} className="site-mobile-categories"><summary>{name} categories</summary><div>{categories.map(([label, slug]) => <Link href={`/activities/${slug}`} key={slug} onClick={() => setMenuOpen(false)}>{label}</Link>)}</div></details>)}
      </nav>}
      {breadcrumb && <nav className="site-breadcrumb" aria-label="Breadcrumb"><ol>
        <li><Link href="/">Home</Link></li>
        {breadcrumb.map((item, index) => <li key={`${item.name}-${index}`}><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}
      </ol></nav>}
    </header>
  );
}
