"use client";

import { useState, useEffect } from "react";
import { useToast } from "./Toast";
import { incrementStat, getActivityStats, ActivityStats } from "@/lib/firebase";

interface RatingWidgetProps {
  activity: string;
}

const RATING_STORAGE_KEY = "activity-generator-ratings";

interface RatingData {
  [activity: string]: "up" | "down";
}

export function RatingWidget({ activity }: RatingWidgetProps) {
  const [userRating, setUserRating] = useState<"up" | "down" | null>(null);
  const [globalStats, setGlobalStats] = useState<ActivityStats | null>(null);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(false);
  const { showToast } = useToast();

  // Check if Firebase is configured
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    setIsFirebaseConfigured(!!apiKey && apiKey !== "your-api-key");
  }, []);

  // Load global stats from Firebase
  useEffect(() => {
    if (isFirebaseConfigured) {
      getActivityStats(activity).then((stats) => {
        if (stats) setGlobalStats(stats);
      });
    }
  }, [activity, isFirebaseConfigured]);

  const getStoredRatings = (): RatingData => {
    try {
      const stored = localStorage.getItem(RATING_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const handleRate = async (rating: "up" | "down") => {
    // Store locally first
    const ratings = getStoredRatings();
    ratings[activity] = rating;
    localStorage.setItem(RATING_STORAGE_KEY, JSON.stringify(ratings));
    setUserRating(rating);

    // Update Firebase if configured
    if (isFirebaseConfigured) {
      const success = await incrementStat(activity, rating === "up" ? "thumbsUp" : "thumbsDown");
      if (success) {
        // Refresh stats
        const stats = await getActivityStats(activity);
        if (stats) setGlobalStats(stats);
      }
    }

    if (rating === "up") {
      showToast("Thanks for the positive feedback!", "success");
    } else {
      showToast("Thanks for your feedback! We'll try better next time.", "info");
    }
  };

  return (
    <div className="flex items-center gap-3 mt-4" role="group" aria-label={`Rate activity: ${activity}`}>
      <span className="text-sm text-gray-500 mr-2">Was this helpful?</span>
      <button
        onClick={() => handleRate("up")}
        className={`
          p-2 rounded-lg transition-colors relative
          ${userRating === "up" 
            ? "bg-green-100 text-green-600" 
            : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-500"
          }
        `}
        aria-label="Thumbs up"
        aria-pressed={userRating === "up"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill={userRating === "up" ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
        {globalStats && globalStats.thumbsUp > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
            {globalStats.thumbsUp}
          </span>
        )}
      </button>
      <button
        onClick={() => handleRate("down")}
        className={`
          p-2 rounded-lg transition-colors relative
          ${userRating === "down" 
            ? "bg-red-100 text-red-600" 
            : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
          }
        `}
        aria-label="Thumbs down"
        aria-pressed={userRating === "down"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill={userRating === "down" ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
          />
        </svg>
        {globalStats && globalStats.thumbsDown > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
            {globalStats.thumbsDown}
          </span>
        )}
      </button>
    </div>
  );
}
