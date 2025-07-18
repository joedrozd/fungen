"use client";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Category = {
  name: string;
  activities: string[];
};

export default function Home() {
  const [activity, setActivity] = useState("Click a button for an idea!");
  const [leisureCategories, setLeisureCategories] = useState<Category[]>([]);
  const [productiveCategories, setProductiveCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<'leisure' | 'productive'>('leisure');
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const [leisureRes, productiveRes] = await Promise.all([
          fetch('/activities.json'),
          fetch('/productive-activities.json')
        ]);
        const leisureData = await leisureRes.json();
        const productiveData = await productiveRes.json();
        setLeisureCategories(leisureData.categories);
        setProductiveCategories(productiveData.categories);
      } catch (error) {
        console.error("Error loading activities:", error);
        setLeisureCategories([{
          name: "Default",
          activities: ["Take a walk", "Read a book", "Try a recipe"]
        }]);
        setProductiveCategories([{
          name: "Default", 
          activities: ["Organize workspace", "Update resume", "Learn new skill"]
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

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
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    ><Analytics/>
      <Card className="text-center max-w-md bg-white/90">
        <CardHeader>
          <img src="/logo.png" alt="Logo" className="mx-auto mb-4 h-16 w-auto" />
          <CardTitle className="text-3xl">Activity Generator</CardTitle>
          <p className="text-muted-foreground">
            Need inspiration for your next hour? Click below for random leisure or productive activity ideas!
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6 font-medium">{activity}</p>
        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => {
                let categories = [];
                if (selectedCategory) {
                  // Only use selected category if one is chosen
                  categories = [...leisureCategories, ...productiveCategories]
                    .filter(c => c.name === selectedCategory);
                } else {
                  // If no category selected, use current activeType
                  categories = activeType === 'leisure' ? leisureCategories : productiveCategories;
                }

                // Get all activities from filtered categories
                const activities = categories.flatMap(c => c.activities);
                
                // Fallback activities if none found
                if (activities.length === 0) {
                  const fallback = selectedCategory 
                    ? ["No activities found for this category"]
                    : activeType === 'leisure'
                      ? ["Take a walk", "Read a book", "Try a recipe"]
                      : ["Organize workspace", "Update resume", "Learn new skill"];
                  setActivity(fallback[Math.floor(Math.random() * fallback.length)]);
                } else {
                  const randomIndex = Math.floor(Math.random() * activities.length);
                  setActivity(activities[randomIndex]);
                }
              }}
              className="w-full"
              size="lg"
            >
              Generate Idea
            </Button>
          <div className="flex flex-wrap gap-2 justify-center">
            {[...leisureCategories, ...productiveCategories].map(category => (
              <Button
                key={category.name}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
                variant={
                  selectedCategory === category.name 
                    ? leisureCategories.some(c => c.name === category.name)
                      ? "default" 
                      : "destructive"
                    : "outline"
                }
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={() => setShowTable(!showTable)}
          variant="ghost"
          className="mt-4"
        >
          {showTable ? 'Hide Activities Table' : 'Show All Activities'}
        </Button>

        {showTable && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">All Activities</h2>
            <Card className="overflow-auto max-h-96">
              <CardContent className="p-4">
                <div className="grid gap-6">
              {[...leisureCategories, ...productiveCategories].map(category => (
                <div key={category.name}>
                  <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                  <ul className="list-disc pl-5 grid grid-cols-1 md:grid-cols-2 gap-1">
                    {category.activities.map((activity, i) => (
                      <li key={i} className="text-sm">{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        </CardContent>
      </Card>
      <a 
        href="https://paypal.me/JDrozd?country.x=GB&locale.x=en_GB" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-full shadow-lg flex items-center gap-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-9a1 1 0 112 0v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 110-2h1V7z" clipRule="evenodd" />
        </svg>
        Buy Me a Coffee
      </a>
    </div>
  );
}
