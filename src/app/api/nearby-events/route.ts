import { NextResponse } from "next/server";
import type { NearbyEvent } from "@/lib/nearby-events";

export const dynamic = "force-dynamic";

const VIATOR_BASE_URL =
  process.env.VIATOR_API_BASE_URL ?? "https://api.sandbox.viator.com/partner";
const VIATOR_LOCALE = process.env.VIATOR_LOCALE ?? "en-GB";
const VIATOR_CURRENCY = process.env.VIATOR_CURRENCY ?? "GBP";

type SearchRequest = {
  location?: unknown;
  country?: unknown;
  latitude?: unknown;
  longitude?: unknown;
};

type JsonRecord = Record<string, unknown>;

type ResolvedLocation = {
  displayName: string;
  searchTerms: string[];
};

const noStoreHeaders = { "Cache-Control": "private, no-store" };

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function number(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function secureUrl(value: unknown): string | undefined {
  const candidate = text(value);
  if (!candidate) return undefined;

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function getPath(value: unknown, path: string[]): unknown {
  return path.reduce<unknown>(
    (current, key) => (isRecord(current) ? current[key] : undefined),
    value
  );
}

function findProductResults(payload: unknown): JsonRecord[] {
  if (!isRecord(payload)) return [];

  const candidates = [
    payload.products,
    getPath(payload, ["products", "results"]),
    payload.results,
    getPath(payload, ["data", "products"]),
    getPath(payload, ["data", "products", "results"]),
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate.filter(isRecord);
    }
  }

  return [];
}

function getImageUrl(product: JsonRecord): string | undefined {
  const direct = secureUrl(product.thumbnail ?? product.imageUrl);
  if (direct) return direct;

  const images = Array.isArray(product.images) ? product.images : [];
  for (const image of images) {
    if (!isRecord(image)) continue;
    const imageDirect = secureUrl(image.url);
    if (imageDirect) return imageDirect;

    const variants = Array.isArray(image.variants) ? image.variants : [];
    const ordered = variants
      .filter(isRecord)
      .sort((a, b) => (number(b.width) ?? 0) - (number(a.width) ?? 0));
    for (const variant of ordered) {
      const url = secureUrl(variant.url);
      if (url) return url;
    }
  }

  return undefined;
}

function getReviewData(product: JsonRecord) {
  const rating =
    number(product.rating) ??
    number(getPath(product, ["reviews", "combinedAverageRating"])) ??
    number(getPath(product, ["reviews", "reviewCountTotals", "combinedAverageRating"]));
  const reviewCount =
    number(product.reviewCount) ??
    number(getPath(product, ["reviews", "totalReviews"])) ??
    number(getPath(product, ["reviews", "reviewCountTotals", "totalReviews"]));

  return { rating, reviewCount };
}

function getDuration(product: JsonRecord): string | undefined {
  const duration = isRecord(product.duration) ? product.duration : undefined;
  if (!duration) return undefined;

  const fixed = number(duration.fixedDurationInMinutes);
  const from = number(duration.variableDurationFromMinutes);
  const to = number(duration.variableDurationToMinutes);

  const format = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    if (!hours) return `${remainder} min`;
    return remainder ? `${hours} hr ${remainder} min` : `${hours} hr`;
  };

  if (fixed) return format(fixed);
  if (from && to) return `${format(from)}–${format(to)}`;
  if (from) return `From ${format(from)}`;
  return undefined;
}

function normalizeProduct(product: JsonRecord): NearbyEvent | null {
  const id = text(product.productCode ?? product.code);
  const title = text(product.title);
  if (!id || !title) return null;

  const productUrl = secureUrl(
    product.productUrl ?? product.clickOffToLander ?? product.url
  );
  if (!productUrl) return null;

  const { rating, reviewCount } = getReviewData(product);
  const price =
    number(product.fromPrice) ??
    number(getPath(product, ["pricing", "summary", "fromPrice"]));
  const currency =
    text(product.currency) ??
    text(getPath(product, ["pricing", "currency"])) ??
    (price !== undefined ? VIATOR_CURRENCY : undefined);

  return {
    id,
    title,
    description: text(product.description ?? product.shortDescription),
    imageUrl: getImageUrl(product),
    productUrl,
    rating,
    reviewCount,
    price,
    currency,
    duration: getDuration(product),
    freeCancellation:
      product.freeCancellation === true ||
      (Array.isArray(product.flags) && product.flags.includes("FREE_CANCELLATION")),
  };
}

function resolvedLocationFromGeocoder(data: JsonRecord): ResolvedLocation {
  const address = isRecord(data.address) ? data.address : {};
  const locality = text(
    address.city ?? address.town ?? address.municipality ?? address.village
  );
  const widerArea = text(address.state_district ?? address.county ?? address.state);
  const country = text(address.country);
  const fallback = text(data.display_name);
  const displayParts = [locality, widerArea, country].filter(
    (part, index, values): part is string => Boolean(part) && values.indexOf(part) === index
  );
  const displayName = displayParts.join(", ") || fallback;

  if (!displayName) throw new Error("Could not identify this location");

  const searchTerms = [
    locality && country ? `${locality}, ${country}` : undefined,
    locality,
    widerArea && country ? `${widerArea}, ${country}` : undefined,
    widerArea,
    displayName,
  ].filter(
    (part, index, values): part is string => Boolean(part) && values.indexOf(part) === index
  );

  return { displayName, searchTerms };
}

async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<ResolvedLocation> {
  const params = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
    format: "jsonv2",
    zoom: "10",
    addressdetails: "1",
  });

  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, {
    headers: {
      Accept: "application/json",
      "Accept-Language": VIATOR_LOCALE,
      "User-Agent": "FunGen nearby events (https://fungen.app)",
    },
    signal: AbortSignal.timeout(8_000),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Location lookup failed");
  const data: unknown = await response.json();
  if (!isRecord(data)) throw new Error("Location lookup returned an invalid response");

  return resolvedLocationFromGeocoder(data);
}

async function geocodeEnteredLocation(query: string): Promise<ResolvedLocation> {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    limit: "1",
    addressdetails: "1",
  });

  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
    headers: {
      Accept: "application/json",
      "Accept-Language": VIATOR_LOCALE,
      "User-Agent": "FunGen nearby events (https://fungen.app)",
    },
    signal: AbortSignal.timeout(8_000),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Location lookup failed");
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !isRecord(data[0])) {
    throw new Error("Could not identify this location");
  }

  return resolvedLocationFromGeocoder(data[0]);
}

async function searchViator(location: string): Promise<NearbyEvent[]> {
  const apiKey = VIATOR_BASE_URL.includes("api.sandbox.viator.com")
    ? process.env.VIATOR_SANDBOX_API_KEY ?? process.env.VIATOR_API_KEY
    : process.env.VIATOR_API_KEY;
  if (!apiKey) throw new Error("VIATOR_API_KEY_NOT_CONFIGURED");

  const today = new Date();
  const endDate = new Date(today);
  endDate.setUTCDate(endDate.getUTCDate() + 30);
  const toDate = (date: Date) => date.toISOString().slice(0, 10);

  const response = await fetch(`${VIATOR_BASE_URL}/search/freetext`, {
    method: "POST",
    headers: {
      Accept: "application/json;version=2.0",
      "Accept-Language": VIATOR_LOCALE,
      "Content-Type": "application/json",
      "exp-api-key": apiKey,
    },
    body: JSON.stringify({
      searchTerm: location,
      productFiltering: {
        dateRange: { from: toDate(today), to: toDate(endDate) },
        includeAutomaticTranslations: true,
      },
      productSorting: { sort: "REVIEW_AVG_RATING", order: "DESCENDING" },
      searchTypes: [
        { searchType: "PRODUCTS", pagination: { start: 1, count: 3 } },
      ],
      currency: VIATOR_CURRENCY,
    }),
    signal: AbortSignal.timeout(12_000),
    cache: "no-store",
  });

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = isRecord(data) ? text(data.message) : undefined;
    throw new Error(message ?? `Viator request failed (${response.status})`);
  }

  return findProductResults(data)
    .map(normalizeProduct)
    .filter((event): event is NearbyEvent => event !== null)
    .slice(0, 3);
}

export async function POST(request: Request) {
  try {
    const body: SearchRequest = await request.json();
    const typedLocation = text(body.location)?.slice(0, 120);
    const country = text(body.country)?.slice(0, 80);
    const latitude = number(body.latitude);
    const longitude = number(body.longitude);

    let location: string;
    let searchTerms: string[];
    if (typedLocation) {
      const enteredLocation = country ? `${typedLocation}, ${country}` : typedLocation;
      location = enteredLocation;
      searchTerms = [enteredLocation];

      // Resolve manual input before searching products so neighbourhoods,
      // postcodes, and same-named places map to the intended town or city.
      try {
        const resolved = await geocodeEnteredLocation(enteredLocation);
        location = resolved.displayName;
        searchTerms = resolved.searchTerms;
      } catch {
        // Named destinations can still be useful to Viator when the geocoder
        // has no match. Explicit postcodes/countries should not silently
        // search a potentially unrelated place.
        if (/\d/.test(typedLocation) || country) {
          throw new Error("Could not identify this location");
        }
      }
    } else if (
      latitude !== undefined &&
      longitude !== undefined &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    ) {
      const resolved = await reverseGeocode(latitude, longitude);
      location = resolved.displayName;
      searchTerms = resolved.searchTerms;
    } else {
      return NextResponse.json(
        { error: "Enter a location or share your current position." },
        { status: 400, headers: noStoreHeaders }
      );
    }

    let events: NearbyEvent[] = [];
    for (const searchTerm of searchTerms) {
      events = await searchViator(searchTerm);
      if (events.length) break;
    }

    // If a normal place-name search is empty, resolve it geographically and
    // retry its locality and surrounding area before showing an empty state.
    if (!events.length && typedLocation && !/\d/.test(typedLocation) && !country) {
      try {
        const resolved = await geocodeEnteredLocation(typedLocation);
        location = resolved.displayName;
        for (const searchTerm of resolved.searchTerms) {
          if (searchTerms.includes(searchTerm)) continue;
          events = await searchViator(searchTerm);
          if (events.length) break;
        }
      } catch {
        // Keep the original empty result if the optional broadening lookup fails.
      }
    }

    return NextResponse.json({ location, events }, { headers: noStoreHeaders });
  } catch (error) {
    console.error("Nearby events search failed:", error);
    const missingKey =
      error instanceof Error && error.message === "VIATOR_API_KEY_NOT_CONFIGURED";
    return NextResponse.json(
      {
        error: missingKey
          ? "Nearby events are not configured yet. Add the Viator API key to enable them."
          : "We couldn't find nearby events right now. Please try another location.",
      },
      { status: missingKey ? 503 : 502, headers: noStoreHeaders }
    );
  }
}
