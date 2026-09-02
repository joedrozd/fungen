"use client";

import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, LocateFixed, MapPin, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NearbyEvent, NearbyEventsResponse } from "@/lib/nearby-events";

type SearchState = "idle" | "locating" | "loading" | "success" | "error";

type LocationSuggestion = {
  id: string;
  label: string;
  country?: string;
  latitude: number;
  longitude: number;
};

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
  const [country, setCountry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [resolvedLocation, setResolvedLocation] = useState("");
  const [events, setEvents] = useState<NearbyEvent[]>([]);
  const [state, setState] = useState<SearchState>("idle");
  const [error, setError] = useState("");
  const busy = state === "locating" || state === "loading";

  useEffect(() => {
    const query = location.trim();
    if (query.length < 3 || query === selectedLocation || busy) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSuggestionsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setSuggestionsLoading(true);
      const params = new URLSearchParams({ q: query });
      if (country.trim()) params.set("country", country.trim());

      try {
        const response = await fetch(`/api/location-search?${params}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as { suggestions?: LocationSuggestion[] };
        const nextSuggestions = response.ok ? data.suggestions ?? [] : [];
        setSuggestions(nextSuggestions);
        setShowSuggestions(nextSuggestions.length > 0);
        setActiveSuggestion(-1);
      } catch (caught) {
        if (!(caught instanceof DOMException && caught.name === "AbortError")) {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } finally {
        if (!controller.signal.aborted) setSuggestionsLoading(false);
      }
    }, 350);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [location, country, selectedLocation, busy]);

  const chooseSuggestion = (suggestion: LocationSuggestion) => {
    setLocation(suggestion.label);
    setSelectedLocation(suggestion.label);
    setSelectedCoordinates({
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
    });
    if (suggestion.country) setCountry(suggestion.country);
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const handleLocationKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || !suggestions.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestion((current) => (current + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestion((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1
      );
    } else if (event.key === "Enter" && activeSuggestion >= 0) {
      event.preventDefault();
      chooseSuggestion(suggestions[activeSuggestion]);
    } else if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

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
    const trimmedCountry = country.trim();
    if (selectedCoordinates && trimmed === selectedLocation) {
      void fetchEvents(selectedCoordinates);
      return;
    }
    void fetchEvents({
      location: trimmed,
      ...(trimmedCountry ? { country: trimmedCountry } : {}),
    });
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
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="event-location" className="sr-only">
              Town, city, or postcode
            </label>
            <div
              className="relative min-w-0 flex-1 sm:w-1/2"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setShowSuggestions(false);
                }
              }}
            >
              <MapPin
                aria-hidden="true"
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
              />
              <input
                id="event-location"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                  setSelectedLocation("");
                  setSelectedCoordinates(null);
                }}
                onFocus={() => {
                  if (suggestions.length) setShowSuggestions(true);
                }}
                onKeyDown={handleLocationKeyDown}
                placeholder="Town, city, or postcode"
                autoComplete="postal-code"
                maxLength={120}
                disabled={busy}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showSuggestions}
                aria-controls="location-suggestions"
                aria-activedescendant={
                  activeSuggestion >= 0
                    ? `location-suggestion-${suggestions[activeSuggestion]?.id}`
                    : undefined
                }
                className="h-10 w-full rounded-md border bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 disabled:opacity-60"
              />
              {suggestionsLoading && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  Searching…
                </span>
              )}
              {showSuggestions && (
                <ul
                  id="location-suggestions"
                  role="listbox"
                  className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-md border bg-white py-1 text-left shadow-lg"
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion.id}
                      id={`location-suggestion-${suggestion.id}`}
                      role="option"
                      aria-selected={index === activeSuggestion}
                    >
                      <button
                        type="button"
                        onClick={() => chooseSuggestion(suggestion)}
                        className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                          index === activeSuggestion ? "bg-emerald-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="line-clamp-2">{suggestion.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <label htmlFor="event-country" className="sr-only">
              Country (optional)
            </label>
            <input
              id="event-country"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
                setSelectedLocation("");
                setSelectedCoordinates(null);
              }}
              placeholder="Country (optional)"
              autoComplete="country-name"
              maxLength={80}
              disabled={busy}
              className="h-10 min-w-0 flex-1 rounded-md border bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 sm:w-1/2"
            />
          </div>
          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Button type="submit" disabled={busy}>
              <Search aria-hidden="true" />
              Search
            </Button>
            <Button type="button" variant="outline" onClick={handleUseLocation} disabled={busy}>
              <LocateFixed aria-hidden="true" />
              Use my location
            </Button>
          </div>
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
