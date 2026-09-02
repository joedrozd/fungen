"use client";

import { Button } from "@/components/ui/button";
import { RatingWidget } from "@/components/RatingWidget";
import { FavoritesList } from "@/components/FavoritesList";
import { SocialShare } from "@/components/SocialShare";
import { useToast } from "@/components/Toast";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export function ActivityActions({ activityName }: { activityName: string }) {
  const { addRecentActivity } = useUserPreferences();
  const { showToast } = useToast();

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
      <Button
        className="w-full mb-4"
        onClick={() => {
          addRecentActivity(activityName);
          showToast(`Added "${activityName}" to recent activities`, "success");
        }}
      >
        I&rsquo;m doing this
      </Button>
      <RatingWidget activity={activityName} />
      <FavoritesList currentActivity={activityName} onSelectFavorite={() => {}} />
      <SocialShare activity={activityName} />
    </div>
  );
}
