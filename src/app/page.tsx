"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [activity, setActivity] = useState("Click a button for an idea!");
  const [leisureActivities, setLeisureActivities] = useState<string[]>([]);
  const [productiveActivities, setProductiveActivities] = useState<string[]>([]);
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
        setLeisureActivities(leisureData.activities);
        setProductiveActivities(productiveData.activities);
      } catch (error) {
        console.error("Error loading activities:", error);
        setLeisureActivities(["Take a walk", "Read a book", "Try a recipe"]);
        setProductiveActivities(["Organize workspace", "Update resume", "Learn new skill"]);
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
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-6">One-Hour Activity Generator</h1>
        <p className="text-lg mb-8">{activity}</p>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => {
              const randomIndex = Math.floor(Math.random() * leisureActivities.length);
              setActivity(leisureActivities[randomIndex]);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            Leisure Activity
          </button>
          <button
            onClick={() => {
              const randomIndex = Math.floor(Math.random() * productiveActivities.length);
              setActivity(productiveActivities[randomIndex]);
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            Productive Activity
          </button>
        </div>
      </div>
    </div>
  );
}
