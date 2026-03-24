"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackToTop } from "@/components/BackToTop";

type Category = {
  name: string;
  activities: any[];
};

export default function ActivitiesPage() {
  const [leisureCategories, setLeisureCategories] = useState<Category[]>([]);
  const [productiveCategories, setProductiveCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const formatCategorySlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <p>Loading activities...</p>
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
      <Navigation onSearch={() => {}} breadcrumb={[{ name: "Activities" }]} />

      <main className="flex-1 p-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">Browse All Activities</h1>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Leisure Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-white bg-black/30 px-4 py-2 rounded-lg inline-block shadow-sm">
                Leisure
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {leisureCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/activities/${formatCategorySlug(cat.name)}`}
                    className="block group"
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 bg-white/90">
                      <CardHeader className="p-4">
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                          {cat.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-gray-500">{cat.activities.length} activities</p>
                        <Button className="mt-4 w-full" variant="outline" size="sm">
                          Browse
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Productive Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-white bg-black/30 px-4 py-2 rounded-lg inline-block shadow-sm">
                Productive
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {productiveCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/activities/${formatCategorySlug(cat.name)}`}
                    className="block group"
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 bg-white/90">
                      <CardHeader className="p-4">
                        <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">
                          {cat.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-gray-500">{cat.activities.length} activities</p>
                        <Button className="mt-4 w-full" variant="outline" size="sm">
                          Browse
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <BackToTop />

      <footer className="bg-white/80 py-6 text-center text-sm text-gray-600 mt-12">
        <p>© {new Date().getFullYear()} Activity Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}
