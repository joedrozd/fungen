"use client";

import { useEffect, useState } from "react";
import { useToast } from "./Toast";
import { incrementStat } from "@/lib/firebase";

interface SocialShareProps {
  activity: string;
}

export function SocialShare({ activity }: SocialShareProps) {
  const { showToast } = useToast();
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(false);

  // Check if Firebase is configured
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    setIsFirebaseConfigured(!!apiKey && apiKey !== "your-api-key");
  }, []);

  if (!activity || activity === "Click a button for an idea!") {
    return null;
  }

  const shareText = encodeURIComponent(`Try this activity: ${activity}`);
  const shareUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");

  const shareToTwitter = async () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
    showToast("Opening Twitter...", "info");
    
    // Track share in Firebase
    if (isFirebaseConfigured) {
      await incrementStat(activity, "shares");
    }
  };

  const shareToLinkedIn = async () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
    showToast("Opening LinkedIn...", "info");
    
    // Track share in Firebase
    if (isFirebaseConfigured) {
      await incrementStat(activity, "shares");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!", "success");
      
      // Track share in Firebase
      if (isFirebaseConfigured) {
        await incrementStat(activity, "shares");
      }
    } catch {
      showToast("Failed to copy link", "error");
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-sm text-gray-500 mr-2">Share:</span>
      <button
        onClick={shareToTwitter}
        className="p-2 rounded-lg bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button
        onClick={shareToLinkedIn}
        className="p-2 rounded-lg bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>
      <button
        onClick={copyLink}
        className="p-2 rounded-lg bg-gray-600 text-white hover:opacity-90 transition-opacity"
        aria-label="Copy link"
        title="Copy link"
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
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </button>
    </div>
  );
}
