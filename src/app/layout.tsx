import Script from "next/script";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ToastProvider } from "@/components/Toast";

const jakartaSans = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-jakarta-sans",
  weight: "300 700",
  display: "swap",
});

const spaceMono = localFont({
  src: [
    { path: "./fonts/space-mono-latin.woff2", weight: "400" },
    { path: "./fonts/space-mono-bold-latin.woff2", weight: "700" },
  ],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fungen.app"),
  title: "Random Activity Generator | Free Things to Do",
  description:
    "Get random ideas for leisure or productive activities. Discover outdoor adventures, creative projects, mindfulness exercises, and more.",
  keywords: [
    "activity generator",
    "things to do",
    "leisure activities",
    "productive activities",
    "fun ideas",
    "random activity",
  ],
  openGraph: {
    title: "Random Activity Generator",
    description: "Get random ideas for leisure or productive activities",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4600250276179601"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <meta name="google-adsense-account" content="ca-pub-4600250276179601"></meta>
      </head>
      <body
        className={`${jakartaSans.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        <ToastProvider>{children}</ToastProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
