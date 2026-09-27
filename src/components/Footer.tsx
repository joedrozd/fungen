import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <Link href="/" className="site-footer-brand">Fungen // Everyday possibility</Link>
        <nav aria-label="Footer"><Link href="/activities">All activities</Link><Link href="/about">About & FAQ</Link><a href="https://paypal.me/JDrozd?country.x=GB&locale.x=en_GB" target="_blank" rel="noopener noreferrer">Buy me a coffee ↗</a></nav>
      </div>
      <div className="site-footer-legal">
        <p>© {new Date().getFullYear()} Activity Generator</p>
        <nav aria-label="Legal"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><Link href="/disclaimer">Disclaimer</Link></nav>
      </div>
    </footer>
  );
}
