"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { ExternalLink, LocateFixed, MapPin, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NearbyEvent, NearbyEventsResponse } from "@/lib/nearby-events";

type SearchState = "idle" | "locating" | "loading" | "success" | "error";

const formatPrice = (event: NearbyEvent) => {
  if (event.price === undefined || !event.currency) return null;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: event.currency,
      maximumFractionDigits: 2,
    }).format(event.price);
  } catch {
    return `${event.currency} ${event.price.toFixed(2)}`;
  }
};

export function NearbyEvents() {
  const [location, setLocation] = useState("");
  const [resolvedLocation, setResolvedLocation] = useState("");
  const [events, setEvents] = useState<NearbyEvent[]>([]);
  const [state, setState] = useState<SearchState>("idle");
  const [error, setError] = useState("");

  const fetchEvents = async (body: Record<string, string | number>) => {
    setState("loading");
    setError("");
    setEvents([]);

    try {
      const response = await fetch("/api/nearby-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as NearbyEventsResponse & { error?: string };
      if (!response.ok) throw new Error(data.error || "Nearby event search failed.");

      setResolvedLocation(data.location);
      setEvents(data.events);
      setState("success");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Nearby event search failed.");
      setState("error");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = location.trim();
    if (!trimmed) {
      setError("Enter a town, city, or postcode.");
      setState("error");
      return;
    }
    void fetchEvents({ location: trimmed });
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Location services aren't supported by this browser. Enter a place instead.");
      setState("error");
      return;
    }

    setState("locating");
    setError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        void fetchEvents({ latitude: coords.latitude, longitude: coords.longitude });
      },
      (geolocationError) => {
        const denied = geolocationError.code === geolocationError.PERMISSION_DENIED;
        setError(
          denied
            ? "Location access was declined. Enter a town, city, or postcode instead."
            : "We couldn't get your location. Enter it manually instead."
        );
        setState("error");
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 10 * 60 * 1000 }
    );
  };

  const busy = state === "locating" || state === "loading";

  return (
    <Card className="w-full max-w-4xl bg-white/95" aria-labelledby="nearby-events-title">
      <CardHeader className="text-center">
        <div className="mx-auto mb-1 flex size-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <MapPin aria-hidden="true" className="size-5" />
        </div>
        <CardTitle id="nearby-events-title" className="text-2xl">
          Discover events near you
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Share your location or enter a place to get three nearby experiences.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-2 sm:flex-row">
          <label htmlFor="event-location" className="sr-only">
            Town, city, or postcode
          </label>
          <div className="relative min-w-0 flex-1">
            <MapPin
              aria-hidden="true"
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
            />
            <input
              id="event-location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Town, city, or postcode"
              autoComplete="postal-code"
              maxLength={120}
              disabled={busy}
              className="h-10 w-full rounded-md border bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 disabled:opacity-60"
            />
          </div>
          <Button type="submit" disabled={busy}>
            <Search aria-hidden="true" />
            Search
          </Button>
          <Button type="button" variant="outline" onClick={handleUseLocation} disabled={busy}>
            <LocateFixed aria-hidden="true" />
            Use my location
          </Button>
        </form>

        <div className="mt-4 min-h-6 text-center text-sm" aria-live="polite">
          {state === "locating" && <p>Requesting your location…</p>}
          {state === "loading" && <p>Finding nearby experiences…</p>}
          {state === "error" && <p className="text-red-700">{error}</p>}
          {state === "success" && (
            <p className="text-gray-600">
              {events.length
                ? `Top picks around ${resolvedLocation}`
                : `No experiences found around ${resolvedLocation}. Try a nearby city.`}
            </p>
          )}
        </div>

        {events.length > 0 && (
          <ul className="mt-3 grid gap-4 md:grid-cols-3" aria-label={`Events near ${resolvedLocation}`}>
            {events.map((event) => {
              const price = formatPrice(event);
              return (
                <li key={event.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt=""
                      width={600}
                      height={400}
                      unoptimized
                      className="h-40 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-emerald-50 text-emerald-700">
                      <MapPin aria-hidden="true" className="size-8" />
                    </div>
                  )}
                  <div className="flex h-[calc(100%-10rem)] flex-col p-4 text-left">
                    <h3 className="line-clamp-2 font-semibold text-gray-900">{event.title}</h3>
                    {(event.rating !== undefined || event.duration) && (
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                        {event.rating !== undefined && (
                          <span className="flex items-center gap-1">
                            <Star aria-hidden="true" className="size-3.5 fill-amber-400 text-amber-400" />
                            {event.rating.toFixed(1)}
                            {event.reviewCount !== undefined && ` (${event.reviewCount.toLocaleString()})`}
                          </span>
                        )}
                        {event.duration && <span>{event.duration}</span>}
                      </div>
                    )}
                    <div className="mt-auto pt-4">
                      <div className="mb-3 flex min-h-5 items-center justify-between gap-2 text-xs">
                        {event.freeCancellation ? (
                          <span className="font-medium text-emerald-700">Free cancellation</span>
                        ) : (
                          <span />
                        )}
                        {price && <span className="font-semibold text-gray-900">From {price}</span>}
                      </div>
                      <Button asChild className="w-full" size="sm">
                        <a href={event.productUrl} target="_blank" rel="noopener noreferrer sponsored">
                          View on Viator
                          <ExternalLink aria-hidden="true" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-4 text-center text-[11px] text-gray-500">
          Experiences and prices supplied by Viator. Location is used only for this search.
        </p>
      </CardContent>
    </Card>
  );
}
