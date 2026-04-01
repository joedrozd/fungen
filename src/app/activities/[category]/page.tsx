"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RatingWidget } from "@/components/RatingWidget";
import { FavoritesList } from "@/components/FavoritesList";
import { SocialShare } from "@/components/SocialShare";
import { BackToTop } from "@/components/BackToTop";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/components/Toast";
import { useUserPreferences } from "@/hooks/useUserPreferences";

type Activity = {
  name: string;
  description?: string;
  image?: string;
} | string;

type Category = {
  name: string;
  description?: string;
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

const getActivityDescription = (activity: Activity): string | undefined => {
  return typeof activity === "string" ? undefined : activity.description;
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryName = params.category as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isLeisure, setIsLeisure] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { addRecentActivity } = useUserPreferences();
  const { showToast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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
          (c) => c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === categoryName.toLowerCase()
        );
        const foundProductive = productiveCategories.find(
          (c) => c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === categoryName.toLowerCase()
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
      <Navigation
        onSearch={handleSearch}
        breadcrumb={[
          { name: "Activities", href: "/activities" },
          { name: formattedCategoryName }
        ]}
      />

      {/* Main content */}
      <main className="flex-1 p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Category header */}
          <div className="text-center mb-8 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">{formattedCategoryName}</h1>
            {category.description && (
              <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-4 leading-relaxed">{category.description}</p>
            )}
            <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
              {category.activities.length} activities in this category
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex justify-center gap-2 mb-8">
            <Link href="/activities">
              <Button variant={isLeisure === true ? "default" : "outline"} size="sm">
                Leisure
              </Button>
            </Link>
            <Link href="/activities">
              <Button variant={isLeisure === false ? "destructive" : "outline"} size="sm">
                Productive
              </Button>
            </Link>
          </div>

          {/* Activities list */}
          <div className="grid gap-4">
            {category.activities
              .filter(a => getActivityName(a).toLowerCase().includes(searchQuery.toLowerCase()))
              .map((activity, index) => {
                const activityName = getActivityName(activity);
                const activityImage = getActivityImage(activity);
                const activityDescription = getActivityDescription(activity);

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
                              {activityDescription && (
                                <p className="text-sm text-gray-500 mt-1">{activityDescription}</p>
                              )}
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
                            <FavoritesList currentActivity={activityName} onSelectFavorite={() => { }} />
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
                    href={`/activities/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
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
