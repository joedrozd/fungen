"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";

interface NavigationProps {
  onSearch: (query: string) => void;
}

export function Navigation({ onSearch }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setActiveDropdown(null);
    }
  };

  const dropdownItems = {
    leisure: [
      { name: "Outdoor", slug: "outdoor", description: "Parks, hiking, nature" },
      { name: "Creative", slug: "creative", description: "Art, writing, crafts" },
      { name: "Learning", slug: "learning", description: "Skills, languages, knowledge" },
      { name: "Food & Drink", slug: "food-drink", description: "Cooking, tasting, recipes" },
      { name: "Mindfulness", slug: "mindfulness", description: "Meditation, relaxation" },
      { name: "Social", slug: "social", description: "Friends, community" },
      { name: "Games", slug: "games", description: "Board games, puzzles" },
    ],
    productive: [
      { name: "Career Development", slug: "career-development", description: "Professional growth" },
      { name: "Organization", slug: "organization", description: "Workspace & home" },
      { name: "Skills", slug: "skills", description: "Learn new abilities" },
      { name: "Financial", slug: "financial", description: "Money management" },
      { name: "Personal Growth", slug: "personal-growth", description: "Self-improvement" },
      { name: "Home Improvement", slug: "home-improvement", description: "Home maintenance" },
      { name: "Health & Fitness", slug: "health-fitness", description: "Wellness & exercise" },
    ],
  };

  return (
    <nav
      ref={dropdownRef}
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50"
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Home */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg hover:text-blue-600 transition-colors"
          aria-label="Activity Generator Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>Activity Generator</span>
        </Link>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center text-sm text-gray-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-gray-700 font-medium">Generator</span>
            </li>
          </ol>
        </nav>

        {/* Navigation items */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <SearchBar onSearch={onSearch} />

          {/* Dropdown menus */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "leisure" ? null : "leisure")}
              className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1"
              aria-expanded={activeDropdown === "leisure"}
              aria-haspopup="true"
            >
              Leisure Activities
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${activeDropdown === "leisure" ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {activeDropdown === "leisure" && (
              <div
                className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-xl border p-2 z-50"
                role="menu"
                aria-label="Leisure categories"
              >
                {dropdownItems.leisure.map((item) => (
                  <Link
                    key={item.name}
                    href={`/activities/${item.slug}`}
                    onClick={() => setActiveDropdown(null)}
                    className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                    role="menuitem"
                  >
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "productive" ? null : "productive")}
              className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1"
              aria-expanded={activeDropdown === "productive"}
              aria-haspopup="true"
            >
              Productive Activities
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${activeDropdown === "productive" ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {activeDropdown === "productive" && (
              <div
                className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-xl border p-2 z-50"
                role="menu"
                aria-label="Productive categories"
              >
                {dropdownItems.productive.map((item) => (
                  <Link
                    key={item.name}
                    href={`/activities/${item.slug}`}
                    onClick={() => setActiveDropdown(null)}
                    className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                    role="menuitem"
                  >
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
