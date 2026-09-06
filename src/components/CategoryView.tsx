"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RatingWidget } from "@/components/RatingWidget";
import { FavoritesList } from "@/components/FavoritesList";
import { SocialShare } from "@/components/SocialShare";
import { BackToTop } from "@/components/BackToTop";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ActivityHeroFallback } from "@/components/ActivityHeroFallback";
import { useToast } from "@/components/Toast";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { trackActivity } from "@/lib/activity-analytics";

type ActivitySummary = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
};

type CategorySummary = {
  name: string;
  slug: string;
  count: number;
};

type CategoryViewProps = {
  categoryName: string;
  categorySlug: string;
  kind: "leisure" | "productive";
  activities: ActivitySummary[];
  otherCategories: CategorySummary[];
  /** Server-rendered SEO copy that sits between the nav and the activity list. */
  children: React.ReactNode;
};

export function CategoryView({
  categoryName,
  categorySlug,
  kind,
  activities,
  otherCategories,
  children,
}: CategoryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const lastCategoryView = useRef<string | null>(null);
  const { addRecentActivity } = useUserPreferences();
  const { showToast } = useToast();

  useEffect(() => {
    if (lastCategoryView.current === categorySlug) return;
    lastCategoryView.current = categorySlug;
    posthog.capture("category_viewed", {
      category_name: categoryName,
      category_slug: categorySlug,
      activity_type: kind,
      activity_count: activities.length,
      source: "category_list",
    });
  }, [categoryName, categorySlug, kind, activities.length]);

  const activityTrackingData = (activity: ActivitySummary) => ({
    name: activity.name,
    slug: activity.slug,
    categoryName,
    categorySlug,
    kind,
  });

  const handleActivityClick = (activity: ActivitySummary) => {
    addRecentActivity(activity.name);
    showToast(`Added "${activity.name}" to recent activities`, "success");
    trackActivity("activity_started", activityTrackingData(activity), "category_list");
  };

  const handleGuideClick = (activity: ActivitySummary) => {
    trackActivity("activity_selected", activityTrackingData(activity), "category_list");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    posthog.capture("activities_searched", {
      result_count: activities.filter((activity) =>
        activity.name.toLowerCase().includes(query.toLowerCase())
      ).length,
      category_name: categoryName,
      category_slug: categorySlug,
      activity_type: kind,
      source: "category_list",
    });
  };

  const visible = activities.filter((activity) =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <Navigation
        onSearch={handleSearch}
        breadcrumb={[{ name: "Activities", href: "/activities" }, { name: categoryName }]}
      />

      <main className="flex-1 p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {children}

          {/* Category tabs */}
          <div className="flex justify-center gap-2 mb-8">
            <Link href="/activities">
              <Button variant={kind === "leisure" ? "default" : "outline"} size="sm">
                Leisure
              </Button>
            </Link>
            <Link href="/activities">
              <Button variant={kind === "productive" ? "destructive" : "outline"} size="sm">
                Productive
              </Button>
            </Link>
          </div>

          {/* Activities list */}
          <div className="grid gap-4">
            {visible.map((activity) => {
              const href = `/activities/${categorySlug}/${activity.slug}`;

              return (
                <Card
                  key={activity.slug}
                  className="hover:shadow-md transition-shadow overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <Link
                        href={href}
                        onClick={() => handleGuideClick(activity)}
                        data-ph-event="activity_selected"
                        data-ph-source="category_list"
                        className="md:w-48 md:shrink-0 relative h-40 md:h-auto"
                      >
                        {activity.image ? (
                          <Image
                            src={activity.image}
                            alt={activity.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 192px"
                            className="object-cover"
                          />
                        ) : (
                          <ActivityHeroFallback
                            categorySlug={categorySlug}
                            activitySlug={activity.slug}
                            className="absolute inset-0 w-full h-full"
                          />
                        )}
                      </Link>
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <h2 className="text-lg font-medium">
                              <Link
                                href={href}
                                onClick={() => handleGuideClick(activity)}
                                data-ph-event="activity_selected"
                                data-ph-source="category_list"
                                className="hover:text-blue-600 transition-colors"
                              >
                                {activity.name}
                              </Link>
                            </h2>
                            {activity.description && (
                              <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                            )}
                            <Link
                              href={href}
                              onClick={() => handleGuideClick(activity)}
                              data-ph-event="activity_selected"
                              data-ph-source="category_list"
                              className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                            >
                              Read the full guide &rarr;
                            </Link>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              onClick={() => handleActivityClick(activity)}
                              data-ph-event="activity_started"
                              data-ph-source="category_list"
                              size="sm"
                              variant="outline"
                            >
                              Try it
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <RatingWidget activity={activity.name} />
                          <FavoritesList currentActivity={activity.name} onSelectFavorite={() => {}} />
                          <SocialShare activity={activity.name} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-white bg-black/40 rounded-lg py-4">
              No activities match &ldquo;{searchQuery}&rdquo;.
            </p>
          )}

          {/* Other categories */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-white bg-black/30 px-4 py-2 rounded-lg inline-block">
              Other Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {otherCategories.map((cat) => (
                <Link key={cat.slug} href={`/activities/${cat.slug}`} className="block">
                  <Card className="hover:shadow-md transition-shadow h-full bg-white/90">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-medium">{cat.name}</h3>
                      <p className="text-sm text-gray-500">{cat.count} activities</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
}
