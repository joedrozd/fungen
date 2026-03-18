"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RatingWidget } from "@/components/RatingWidget";
import { FavoritesList } from "@/components/FavoritesList";
import { SocialShare } from "@/components/SocialShare";
import { BackToTop } from "@/components/BackToTop";
import { useToast } from "@/components/Toast";
import { useUserPreferences } from "@/hooks/useUserPreferences";

type Activity = {
  name: string;
  image?: string;
} | string;

type Category = {
  name: string;
  activities: Activity[];
};

type CategoryData = {
  categories: Category[];
};

const getActivityName = (activity: Activity): string => {
  return typeof activity === "string" ? activity : activity.name;
};

const getActivityImage = (activity: Activity): string | undefined => {
  return typeof activity === "string" ? undefined : activity.image;
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryName = params.category as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isLeisure, setIsLeisure] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { addRecentActivity } = useUserPreferences();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leisureRes, productiveRes] = await Promise.all([
          fetch("/activities.json"),
          fetch("/productive-activities.json"),
        ]);
        const leisureData: CategoryData = await leisureRes.json();
        const productiveData: CategoryData = await productiveRes.json();

        const leisureCategories = leisureData.categories;
        const productiveCategories = productiveData.categories;

        // Find which type this category belongs to
        const foundLeisure = leisureCategories.find(
          (c) => c.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === categoryName.toLowerCase()
        );
        const foundProductive = productiveCategories.find(
          (c) => c.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === categoryName.toLowerCase()
        );

        if (foundLeisure) {
          setCategory(foundLeisure);
          setIsLeisure(true);
          setAllCategories([...leisureCategories, ...productiveCategories]);
        } else if (foundProductive) {
          setCategory(foundProductive);
          setIsLeisure(false);
          setAllCategories([...leisureCategories, ...productiveCategories]);
        } else {
          // Category not found, redirect to home
          router.push("/");
        }
      } catch (error) {
        console.error("Error loading category:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchData();
    }
  }, [categoryName, router]);

  const handleActivityClick = (activityName: string) => {
    addRecentActivity(activityName);
    showToast(`Added "${activityName}" to recent activities`, "success");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return null;
  }

  const formattedCategoryName = category.name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ");

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

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
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

          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500">
            <ol className="flex items-center gap-1">
              <li>
                <Link href="/" className="hover:text-blue-600">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-gray-700 font-medium">{formattedCategoryName}</span>
              </li>
            </ol>
          </nav>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Category header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">{formattedCategoryName}</h1>
            <p className="text-gray-600">
              {category.activities.length} activities in this category
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex justify-center gap-2 mb-8">
            <Link href="/">
              <Button variant={isLeisure === true ? "default" : "outline"} size="sm">
                Leisure
              </Button>
            </Link>
            <Link href="/">
              <Button variant={isLeisure === false ? "destructive" : "outline"} size="sm">
                Productive
              </Button>
            </Link>
          </div>

          {/* Activities list */}
          <div className="grid gap-4">
            {category.activities.map((activity, index) => {
              const activityName = getActivityName(activity);
              const activityImage = getActivityImage(activity);
              
              return (
                <Card key={index} className="hover:shadow-md transition-shadow overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {activityImage && (
                        <div className="md:w-48 md:shrink-0">
                          <img
                            src={activityImage}
                            alt={activityName}
                            className="w-full h-40 md:h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-lg font-medium">{activityName}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              onClick={() => handleActivityClick(activityName)}
                              size="sm"
                              variant="outline"
                            >
                              Try it
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <RatingWidget activity={activityName} />
                          <FavoritesList currentActivity={activityName} onSelectFavorite={() => {}} />
                          <SocialShare activity={activityName} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Other categories */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Other Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allCategories
                .filter((c) => c.name !== category.name)
                .map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/activities/${cat.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    className="block"
                  >
                    <Card className="hover:shadow-md transition-shadow h-full">
                      <CardContent className="p-4 text-center">
                        <h3 className="font-medium">{cat.name}</h3>
                        <p className="text-sm text-gray-500">{cat.activities.length} activities</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <BackToTop />

      <footer className="bg-white/80 py-4 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Activity Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}
