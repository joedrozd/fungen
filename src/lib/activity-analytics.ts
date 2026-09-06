"use client";

import posthog from "posthog-js";

export type ActivityTrackingData = {
  name: string;
  slug?: string;
  categoryName?: string;
  categorySlug?: string;
  kind?: "leisure" | "productive";
};

export type ActivityEvent =
  | "activity_generated"
  | "activity_viewed"
  | "activity_selected"
  | "activity_started"
  | "activity_copied";

// Accept catalog metadata explicitly: never send whole activity objects or user input.
export function trackActivity(
  event: ActivityEvent,
  activity: ActivityTrackingData,
  source: string,
  context: { category_filter?: string } = {},
) {
  posthog.capture(event, {
    activity_name: activity.name,
    activity_slug: activity.slug ?? null,
    category_name: activity.categoryName ?? null,
    category_slug: activity.categorySlug ?? null,
    activity_type: activity.kind ?? null,
    source,
    ...context,
  });
}
