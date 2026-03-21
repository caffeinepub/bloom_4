import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer
      className="mt-24 border-t border-bloom-divider/50 py-12"
      style={{ background: "rgba(247,216,191,0.3)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bloom-blush/25 border border-bloom-blush/30">
              <span className="text-sm">🌸</span>
            </div>
            <span
              className="font-serif text-xl font-light text-bloom-heading"
              style={{ letterSpacing: "0.08em" }}
            >
              Bloom
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/terms"
              className="font-sans text-xs text-bloom-subtle hover:text-bloom-gold transition-colors"
              data-ocid="footer.link"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-bloom-divider">·</span>
            <Link
              to="/privacy"
              className="font-sans text-xs text-bloom-subtle hover:text-bloom-gold transition-colors"
              data-ocid="footer.link"
            >
              Privacy Policy
            </Link>
            <span className="text-bloom-divider">·</span>
            <Link
              to="/refund"
              className="font-sans text-xs text-bloom-subtle hover:text-bloom-gold transition-colors"
              data-ocid="footer.link"
            >
              Refund Policy
            </Link>
          </div>

          <p className="font-sans text-xs text-bloom-subtle">
            © {new Date().getFullYear()} Bloom. Made with{" "}
            <span className="text-bloom-blush">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bloom-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
