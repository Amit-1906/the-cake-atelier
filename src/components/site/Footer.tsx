import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[color-mix(in_oklab,var(--color-background)_70%,white)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gradient-primary)] text-primary-foreground font-display text-lg">M</span>
              <span className="font-display text-xl">Maison Velvet</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              An atelier of small-batch cakes and patisserie, baked at sunrise
              in our Mumbai studio. Crafted with single-origin ingredients and
              an old-world devotion to detail.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full glass hover:text-primary transition-colors"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/menu" className="hover:text-primary">Menu</Link></li>
              <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/booking" className="hover:text-primary">Reservations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base mb-4">Visit</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>14 Linking Road</li>
              <li>Bandra West, Mumbai</li>
              <li>Open 8am – 10pm</li>
              <li>hello@maisonvelvet.co</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Maison Velvet. Baked with devotion.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
