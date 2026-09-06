"use client";

import { Button } from "@/components/ui/button";
import { RatingWidget } from "@/components/RatingWidget";
import { FavoritesList } from "@/components/FavoritesList";
import { SocialShare } from "@/components/SocialShare";
import { useToast } from "@/components/Toast";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { trackActivity, type ActivityTrackingData } from "@/lib/activity-analytics";

export function ActivityActions({ activity }: { activity: ActivityTrackingData }) {
  const { addRecentActivity } = useUserPreferences();
  const { showToast } = useToast();

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
      <Button
        className="w-full mb-4"
        data-ph-event="activity_started"
        data-ph-source="activity_guide"
        onClick={() => {
          addRecentActivity(activity.name);
          showToast(`Added "${activity.name}" to recent activities`, "success");
          trackActivity("activity_started", activity, "activity_guide");
        }}
      >
        I&rsquo;m doing this
      </Button>
      <RatingWidget activity={activity.name} />
      <FavoritesList currentActivity={activity.name} onSelectFavorite={() => {}} />
      <SocialShare activity={activity.name} />
    </div>
  );
}
