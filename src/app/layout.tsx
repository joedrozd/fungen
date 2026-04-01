import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ToastProvider } from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One-Hour Activity Generator | Find Fun Things to Do",
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
    title: "One-Hour Activity Generator",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>{children}</ToastProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
