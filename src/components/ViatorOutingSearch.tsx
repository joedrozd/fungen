import { NearbyEvents } from "@/components/NearbyEvents";
import type { SoloOuting } from "@/lib/solo-outings";

export function ViatorOutingSearch({ outing }: { outing: SoloOuting }) {
  if (!outing.viatorQuery) return null;

  return (
    <div className="mt-4 border-t border-border pt-4">
      <NearbyEvents outing={{ id: outing.id, title: outing.title }} />
    </div>
  );
}
