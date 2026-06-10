"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Analytics } from "@vercel/analytics/next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tutorial } from "@/components/Tutorial";
import { RatingWidget } from "@/components/RatingWidget";
import { FavoritesList } from "@/components/FavoritesList";
import { SocialShare } from "@/components/SocialShare";
import { BackToTop } from "@/components/BackToTop";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/Toast";
import { useUserPreferences } from "@/hooks/useUserPreferences";

type Category = {
  name: string;
  activities: Array<{ name: string; description?: string; image?: string } | string>;
};

export default function Home() {
  const [activity, setActivity] = useState("Click a button for an idea!");
  const [activityImage, setActivityImage] = useState<string | null>(null);
  const [activityDescription, setActivityDescription] = useState<string | null>(null);
  const [leisureCategories, setLeisureCategories] = useState<Category[]>([]);
  const [productiveCategories, setProductiveCategories] = useState<Category[]>([]);
  const [activeType, setActiveType] = useState<"leisure" | "productive">("leisure");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<string[] | null>(null);

  const { preferences, addRecentActivity } = useUserPreferences();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const [leisureRes, productiveRes] = await Promise.all([
          fetch("/activities.json"),
          fetch("/productive-activities.json"),
        ]);
        const leisureData = await leisureRes.json();
        const productiveData = await productiveRes.json();
        setLeisureCategories(leisureData.categories);
        setProductiveCategories(productiveData.categories);
      } catch (error) {
        console.error("Error loading activities:", error);
        setLeisureCategories([
          {
            name: "Default",
            activities: ["Take a walk", "Read a book", "Try a recipe"],
          },
        ]);
        setProductiveCategories([
          {
            name: "Default",
            activities: ["Organize workspace", "Update resume", "Learn new skill"],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Load user preference for default activity type
  useEffect(() => {
    if (preferences.defaultActivityType) {
      setActiveType(preferences.defaultActivityType);
    }
  }, [preferences.defaultActivityType]);

  const handleGenerateActivity = useCallback(() => {
    let categories: Category[] = [];
    
    if (searchResults) {
      // Use search results if available
      const randomIndex = Math.floor(Math.random() * searchResults.length);
      const selectedActivity = searchResults[randomIndex];
      setActivity(selectedActivity);
      setActivityImage(null);
      setActivityDescription(null);
      addRecentActivity(selectedActivity);
      setSearchResults(null);
      return;
    }

    // Use current activeType, narrowed to the selected category if one is chosen
    categories = activeType === "leisure" ? leisureCategories : productiveCategories;
    if (selectedCategory !== "all") {
      categories = categories.filter((c) => c.name === selectedCategory);
    }

    // Get all activities from filtered categories
    const activities = categories.flatMap((c) => c.activities);

    // Fallback activities if none found
    if (activities.length === 0) {
      const fallback = activeType === "leisure"
        ? ["Take a walk", "Read a book", "Try a recipe"]
        : ["Organize workspace", "Update resume", "Learn new skill"];
      const randomFallback = fallback[Math.floor(Math.random() * fallback.length)];
      setActivity(randomFallback);
      setActivityImage(null);
      setActivityDescription(null);
      addRecentActivity(randomFallback);
    } else {
      const randomIndex = Math.floor(Math.random() * activities.length);
      const selectedActivity = activities[randomIndex];
      const activityName = typeof selectedActivity === 'string' ? selectedActivity : selectedActivity.name;
      const activityImageUrl = typeof selectedActivity === 'string' ? null : selectedActivity.image;
      const activityDesc = typeof selectedActivity === 'string' ? null : selectedActivity.description;
      setActivity(activityName);
      setActivityImage(activityImageUrl || null);
      setActivityDescription(activityDesc || null);
      addRecentActivity(activityName);
    }
  }, [activeType, selectedCategory, leisureCategories, productiveCategories, searchResults, addRecentActivity]);

  // Deterministic daily pick from the full activity pool
  const activityOfTheDay = useMemo(() => {
    const all = [...leisureCategories, ...productiveCategories].flatMap((c) => c.activities);
    if (all.length === 0) return null;
    const now = new Date();
    const seed = now.getFullYear() * 372 + now.getMonth() * 31 + now.getDate();
    const picked = all[seed % all.length];
    return typeof picked === "string"
      ? { name: picked, description: undefined, image: undefined }
      : picked;
  }, [leisureCategories, productiveCategories]);

  const handleSelectActivity = useCallback(
    (selected: { name: string; description?: string; image?: string }) => {
      setActivity(selected.name);
      setActivityImage(selected.image || null);
      setActivityDescription(selected.description || null);
      addRecentActivity(selected.name);
    },
    [addRecentActivity]
  );

  const handleCopyActivity = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(activity);
      showToast("Activity copied to clipboard!", "success");
    } catch {
      showToast("Couldn't copy to clipboard", "error");
    }
  }, [activity, showToast]);

  const handleSearch = useCallback(
    (query: string) => {
      const allActivities = [
        ...leisureCategories.flatMap((c) => c.activities.map(a => typeof a === 'string' ? a : a.name)),
        ...productiveCategories.flatMap((c) => c.activities.map(a => typeof a === 'string' ? a : a.name)),
      ];
      const results = allActivities.filter((a) =>
        a.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      if (results.length > 0) {
        setActivity(`Search: ${results[0]}`);
      } else {
        setActivity("No activities found matching your search");
      }
    },
    [leisureCategories, productiveCategories]
  );

  const handleSelectFavorite = useCallback((favorite: string) => {
    setActivity(favorite);
  }, []);

  const formatCategorySlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const currentCategories = activeType === "leisure" ? leisureCategories : productiveCategories;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <p aria-live="polite">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Analytics />
      
      {/* Navigation with search and dropdowns */}
      <Navigation onSearch={handleSearch} />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 p-8 pt-24">
        <Card className="text-center max-w-md bg-white/90" role="main" aria-label="Activity Generator">
          <CardHeader>
            <Image
              src="/logo.png"
              alt="Activity Generator Logo"
              className="mx-auto mb-4 h-16 w-auto"
              width={64}
              height={64}
              loading="lazy"
            />
            <CardTitle className="text-3xl">Activity Generator</CardTitle>
            <p className="text-muted-foreground">
              Need inspiration for your next hour? Click below for random leisure or productive activity ideas!
            </p>
          </CardHeader>
          <CardContent>
            {/* Activity type toggle */}
            <div className="flex justify-center gap-2 mb-4" role="radiogroup" aria-label="Activity type">
              <Button
                onClick={() => {
                  setActiveType("leisure");
                  setSelectedCategory("all");
                }}
                variant={activeType === "leisure" ? "default" : "outline"}
                size="sm"
                aria-checked={activeType === "leisure"}
                role="radio"
              >
                Leisure
              </Button>
              <Button
                onClick={() => {
                  setActiveType("productive");
                  setSelectedCategory("all");
                }}
                variant={activeType === "productive" ? "destructive" : "outline"}
                size="sm"
                aria-checked={activeType === "productive"}
                role="radio"
              >
                Productive
              </Button>
            </div>

            {/* Category filter for the generator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <label htmlFor="category-filter" className="text-sm text-muted-foreground">
                Category:
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border rounded-md px-2 py-1.5 bg-white hover:border-gray-400 transition-colors"
                aria-label="Filter generator by category"
              >
                <option value="all">All categories</option>
                {currentCategories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Activity display with image */}
            <div className="mb-6">
              {activityImage && (
                <div className="mb-4">
                  <img 
                    src={activityImage}
                    alt="Activity illustration"
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex items-start justify-center gap-2">
                <p className="text-lg font-medium" aria-live="polite">
                  {activity}
                </p>
                {activity && activity !== "Click a button for an idea!" && activity !== "No activities found matching your search" && (
                  <button
                    onClick={handleCopyActivity}
                    className="shrink-0 mt-1 p-1 text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label="Copy activity to clipboard"
                    title="Copy to clipboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {activityDescription && (
                <p className="text-sm text-muted-foreground mt-2">
                  {activityDescription}
                </p>
              )}
            </div>

            {/* Generate button */}
            <div className="flex flex-col gap-4">
              <Button
                onClick={handleGenerateActivity}
                className="w-full"
                size="lg"
                aria-label="Generate new activity idea"
              >
                Generate Idea
              </Button>

              {/* Category buttons - now link to category pages */}
              <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Browse by category">
                {currentCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/activities/${formatCategorySlug(category.name)}`}
                    className="inline-flex"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      {category.name}
                    </Button>
                  </Link>
                ))}
              </div>
              
              <Link href="/activities" className="mt-4">
                <Button variant="link" className="text-blue-600 hover:text-blue-800">
                  Show All Activities
                </Button>
              </Link>
            </div>

            {/* Search results indicator */}
            {searchResults && (
              <div className="mt-4 p-2 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Found {searchResults.length} activities. Click Generate to see them!
                </p>
              </div>
            )}

            {/* Recently generated activities */}
            {preferences.recentActivities.length > 0 && (
              <div className="mt-4 text-left">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Recently generated
                </p>
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Recently generated activities">
                  {preferences.recentActivities.slice(0, 5).map((recent) => (
                    <button
                      key={recent}
                      onClick={() => setActivity(recent)}
                      className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors max-w-full truncate"
                      title={recent}
                    >
                      {recent}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rating widget */}
            {activity && activity !== "Click a button for an idea!" && activity !== "No activities found matching your search" && (
              <RatingWidget activity={activity} />
            )}

            {/* Favorites / My List */}
            {activity && activity !== "Click a button for an idea!" && (
              <FavoritesList currentActivity={activity} onSelectFavorite={handleSelectFavorite} />
            )}

            {/* Social share buttons */}
            <SocialShare activity={activity} />
          </CardContent>
        </Card>

        {/* Activity of the Day */}
        {activityOfTheDay && (
          <Card className="max-w-md w-full bg-white/90" aria-label="Activity of the day">
            <CardContent className="p-4 flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">✨</span>
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                  Activity of the Day
                </p>
                <p className="text-sm font-medium text-gray-900">{activityOfTheDay.name}</p>
              </div>
              <Button
                onClick={() => handleSelectActivity(activityOfTheDay)}
                size="sm"
                variant="outline"
                className="shrink-0"
              >
                Try it
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Back to top button */}
      <BackToTop />

      {/* Tutorial component */}
      <Tutorial />

      {/* Footer with links */}
      <Footer />

      {/* PayPal link */}
      <a
        href="https://paypal.me/JDrozd?country.x=GB&locale.x=en_GB"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-full shadow-lg flex items-center gap-2 transition-colors"
        aria-label="Support the developer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-9a1 1 0 112 0v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 110-2h1V7z"
            clipRule="evenodd"
          />
        </svg>
        <span className="hidden sm:inline">Buy Me a Coffee</span>
      </a>
    </div>
  );
}
