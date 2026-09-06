import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    ui_host: "https://eu.posthog.com",
    defaults: "2026-05-30",
    capture_pageview: "history_change",
    capture_pageleave: true,
    persistence: "localStorage",
    person_profiles: "identified_only",
    // Track explicit activity events without collecting form or location text.
    autocapture: false,
    disable_session_recording: true,
  });
}
