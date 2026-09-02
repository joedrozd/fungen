export type NearbyEvent = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  productUrl: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  currency?: string;
  duration?: string;
  freeCancellation: boolean;
};

export type NearbyEventsResponse = {
  location: string;
  events: NearbyEvent[];
};

