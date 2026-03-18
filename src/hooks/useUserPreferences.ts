"use client";

import { useState, useEffect, useCallback } from "react";

interface UserPreferences {
  defaultActivityType: "leisure" | "productive";
  preferredCategories: string[];
  recentActivities: string[];
}

const PREFERENCES_KEY = "activity-generator-preferences";

const DEFAULT_PREFERENCES: UserPreferences = {
  defaultActivityType: "leisure",
  preferredCategories: [],
  recentActivities: [],
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        setPreferences({ ...DEFAULT_PREFERENCES, ...JSON.parse(stored) });
      }
    } catch {
      setPreferences(DEFAULT_PREFERENCES);
    }
    setIsLoaded(true);
  }, []);

  const savePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
    setPreferences(updated);
  }, [preferences]);

  const setDefaultActivityType = useCallback((type: "leisure" | "productive") => {
    savePreferences({ defaultActivityType: type });
  }, [savePreferences]);

  const addPreferredCategory = useCallback((category: string) => {
    const newCategories = [...preferences.preferredCategories, category];
    savePreferences({ preferredCategories: newCategories });
  }, [preferences.preferredCategories, savePreferences]);

  const removePreferredCategory = useCallback((category: string) => {
    const newCategories = preferences.preferredCategories.filter((c) => c !== category);
    savePreferences({ preferredCategories: newCategories });
  }, [preferences.preferredCategories, savePreferences]);

  const addRecentActivity = useCallback((activity: string) => {
    // Keep only the last 10 recent activities
    const newRecent = [activity, ...preferences.recentActivities.filter((a) => a !== activity)].slice(0, 10);
    savePreferences({ recentActivities: newRecent });
  }, [preferences.recentActivities, savePreferences]);

  // Get recommended activities based on user's history
  const getRecommendations = useCallback((allActivities: string[]): string[] => {
    if (preferences.recentActivities.length === 0) {
      return allActivities.slice(0, 5); // Return random selection if no history
    }

    // Score activities based on recency and frequency
    const activityScores = new Map<string, number>();
    
    preferences.recentActivities.forEach((activity, index) => {
      const score = (preferences.recentActivities.length - index) * 10; // More recent = higher score
      activityScores.set(activity, (activityScores.get(activity) || 0) + score);
    });

    // Sort by score and return top recommendations
    return allActivities
      .map((activity) => ({
        activity,
        score: activityScores.get(activity) || 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((item) => item.activity);
  }, [preferences.recentActivities]);

  return {
    preferences,
    isLoaded,
    setDefaultActivityType,
    addPreferredCategory,
    removePreferredCategory,
    addRecentActivity,
    getRecommendations,
  };
}
