import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/booking", label: "Booking" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between rounded-full px-4 sm:px-6 h-14 transition-all ${
            scrolled ? "glass shadow-[var(--shadow-soft)]" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gradient-primary)] text-primary-foreground font-display text-lg">
              M
            </span>
            <span className="font-display text-xl tracking-tight">Maison&nbsp;Velvet</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    active
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="rounded-full">
                Sign in
              </Button>
            </Link>
            <Link to="/cart">
              <Button size="sm" className="rounded-full gap-2">
                <ShoppingBag className="h-4 w-4" />
                Cart
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass rounded-3xl p-4 animate-fade-in">
            <div className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="px-4 py-3 rounded-2xl hover:bg-muted text-foreground/80"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full rounded-full">Sign in</Button>
                </Link>
                <Link to="/cart" className="flex-1">
                  <Button className="w-full rounded-full">Cart</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
