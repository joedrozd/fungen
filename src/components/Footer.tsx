import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white/80 py-6 text-center text-sm text-gray-600">
      <nav className="flex justify-center gap-6 mb-2" aria-label="Footer">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <Link href="/activities" className="hover:text-blue-600 transition-colors">
          All Activities
        </Link>
        <Link href="/about" className="hover:text-blue-600 transition-colors">
          About & FAQ
        </Link>
      </nav>
      <nav className="flex justify-center gap-4 mb-2 text-xs text-gray-400" aria-label="Legal">
        <Link href="/terms" className="hover:text-blue-600 transition-colors">
          Terms of Service
        </Link>
        <Link href="/privacy" className="hover:text-blue-600 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/cookies" className="hover:text-blue-600 transition-colors">
          Cookie Policy
        </Link>
        <Link href="/disclaimer" className="hover:text-blue-600 transition-colors">
          Disclaimer
        </Link>
      </nav>
      <p>© {new Date().getFullYear()} Activity Generator. All rights reserved.</p>
    </footer>
  );
}
