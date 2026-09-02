import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const noStoreHeaders = { "Cache-Control": "private, no-store" };

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim().slice(0, 120);
  const country = searchParams.get("country")?.trim().slice(0, 80);

  if (!query || query.length < 3) {
    return NextResponse.json({ suggestions: [] }, { headers: noStoreHeaders });
  }

  const params = new URLSearchParams({
    q: country ? `${query}, ${country}` : query,
    format: "jsonv2",
    limit: "5",
    addressdetails: "1",
  });

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: {
        Accept: "application/json",
        "Accept-Language": process.env.VIATOR_LOCALE ?? "en-GB",
        "User-Agent": "FunGen location search (https://fungen.app)",
      },
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`Location provider returned ${response.status}`);
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid location response");

    const suggestions = data.filter(isRecord).flatMap((item) => {
      const id = text(String(item.place_id ?? ""));
      const label = text(item.display_name);
      if (!id || !label) return [];

      const address = isRecord(item.address) ? item.address : {};
      return [{ id, label, country: text(address.country) }];
    });

    return NextResponse.json({ suggestions }, { headers: noStoreHeaders });
  } catch (error) {
    console.error("Location suggestions failed:", error);
    return NextResponse.json({ suggestions: [] }, { headers: noStoreHeaders });
  }
}

