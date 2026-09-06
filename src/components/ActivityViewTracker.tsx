"use client";

import { useEffect, useRef } from "react";
import { trackActivity, type ActivityTrackingData } from "@/lib/activity-analytics";

export function ActivityViewTracker({
  activity,
  source,
}: {
  activity: ActivityTrackingData;
  source: string;
}) {
  const lastView = useRef<string | null>(null);
  const { name, slug, categoryName, categorySlug, kind } = activity;

  useEffect(() => {
    const view = JSON.stringify([slug ?? name, categorySlug, kind, source]);
    if (lastView.current === view) return;
    lastView.current = view;
    trackActivity(
      "activity_viewed",
      { name, slug, categoryName, categorySlug, kind },
      source,
    );
  }, [name, slug, categoryName, categorySlug, kind, source]);

  return null;
}
