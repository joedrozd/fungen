import type { Metadata } from "next";
import { BASE_URL } from "@/lib/activities";
import type { HowToPhoto } from "@/lib/how-to-photos";

const defaultImage = {
  url: `${BASE_URL}/how-to/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Fungen DIY and home how-to guides",
};

export function howToMetadata(title: string, description: string, url: string, type: "website" | "article", photo?: HowToPhoto): Metadata {
  const image = photo ? { url: `${BASE_URL}${photo.src}`, alt: photo.alt } : defaultImage;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type, siteName: "Fungen", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
