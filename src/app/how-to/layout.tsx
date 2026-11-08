import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";

export default function HowToLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-scenic flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-card focus:p-3">
        Skip to content
      </a>
      {children}
      <BackToTop />
      <Footer />
    </div>
  );
}
