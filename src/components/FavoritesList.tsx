"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "./Toast";
import { incrementStat } from "@/lib/firebase";

const FAVORITES_STORAGE_KEY = "activity-generator-favorites";

interface FavoritesListProps {
  currentActivity: string;
  onSelectFavorite: (activity: string) => void;
}

export function FavoritesList({ currentActivity, onSelectFavorite }: FavoritesListProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  // Check if Firebase is configured
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    setIsFirebaseConfigured(!!apiKey && apiKey !== "your-api-key");
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const isFavorite = favorites.includes(currentActivity);

  const toggleFavorite = async () => {
    let newFavorites: string[];
    if (isFavorite) {
      newFavorites = favorites.filter((f) => f !== currentActivity);
      showToast("Removed from My List", "info");
    } else {
      newFavorites = [...favorites, currentActivity];
      showToast("Added to My List!", "success");
      
      // Update Firebase if configured
      if (isFirebaseConfigured) {
        await incrementStat(currentActivity, "favorites");
      }
    }
    saveFavorites(newFavorites);
  };

  const removeFavorite = (activity: string) => {
    const newFavorites = favorites.filter((f) => f !== activity);
    saveFavorites(newFavorites);
    showToast("Removed from My List", "info");
  };

  const clearAllFavorites = () => {
    saveFavorites([]);
    showToast("My List cleared", "info");
    setIsOpen(false);
  };

  // Don't render if no activity is selected
  if (!currentActivity || currentActivity === "Click a button for an idea!") {
    return null;
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      <Button
        onClick={toggleFavorite}
        variant={isFavorite ? "default" : "outline"}
        size="sm"
        className={isFavorite ? "text-red-500" : ""}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill={isFavorite ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {isFavorite ? "Saved" : "Save"}
      </Button>

      {favorites.length > 0 && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          size="sm"
          aria-label="View favorites list"
          aria-expanded={isOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          My List ({favorites.length})
        </Button>
      )}

      {isOpen && favorites.length > 0 && (
        <div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border p-4 z-50 min-w-[280px] max-h-[300px] overflow-y-auto"
          role="list"
          aria-label="Your saved activities"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">My List</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close favorites list"
            >
              ×
            </button>
          </div>
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-sm">No saved activities yet.</p>
          ) : (
            <ul className="space-y-2">
              {favorites.map((favorite, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100"
                >
                  <button
                    onClick={() => {
                      onSelectFavorite(favorite);
                      setIsOpen(false);
                    }}
                    className="text-sm text-left flex-1 hover:text-blue-600"
                    aria-label={`Select ${favorite}`}
                  >
                    {favorite}
                  </button>
                  <button
                    onClick={() => removeFavorite(favorite)}
                    className="text-gray-400 hover:text-red-500 p-1"
                    aria-label={`Remove ${favorite} from favorites`}
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Button
            onClick={clearAllFavorites}
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-red-500 hover:text-red-600"
            aria-label="Clear all favorites"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}
