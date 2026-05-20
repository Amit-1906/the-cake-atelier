import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Star, Truck, Leaf, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";
import hero from "@/assets/hero-cake.jpg";
import macaron from "@/assets/cake-macaron.jpg";
import chocolate from "@/assets/cake-chocolate.jpg";
import pastry from "@/assets/cake-pastry.jpg";
import strawberry from "@/assets/cake-strawberry.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Maison Velvet — Atelier of Luxury Cakes" },
      { name: "description", content: "Hand-crafted small batch cakes, macarons and patisserie. Order online or reserve a table at our Mumbai atelier." },
    ],
  }),
});

function Home() {
  const featured = products.slice(0, 4);
  const bestSellers = products.slice(2, 6);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden hero-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 lg:pt-20 pb-24 lg:pb-32">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-foreground/70">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Atelier · Est. 2014
              </span>
              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
                A quieter kind of
                <span className="block gradient-text italic">indulgence.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                Hand-laminated pastry, single-origin chocolate, and cakes worth
                lingering over. Made in small batches at sunrise — never before.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/menu">
                  <Button size="lg" className="rounded-full px-7 btn-glow gap-2">
                    Explore the menu <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button size="lg" variant="outline" className="rounded-full px-7 bg-background/50">
                    Reserve a table
                  </Button>
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { k: "12yrs", v: "of craft" },
                  { k: "48", v: "signatures" },
                  { k: "4.9★", v: "1.2k reviews" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-display text-2xl">{s.k}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute -inset-8 bg-[var(--gradient-primary)] opacity-20 blur-3xl rounded-full" />
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden glass-card animate-float">
                <img src={hero} alt="Signature rose velvet cake" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 glass-card rounded-2xl px-4 py-3">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <div>
                  <div className="text-sm font-medium">Editor's pick</div>
                  <div className="text-xs text-muted-foreground">Vogue India, 2024</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 hidden sm:block glass-card rounded-2xl px-4 py-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Today</div>
                <div className="text-sm font-medium">Fresh batch · 7am</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Collections</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">Made for every ritual.</h2>
          </div>
          <Link to="/menu" className="hidden sm:inline-flex items-center text-sm gap-1 text-muted-foreground hover:text-primary">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Signature Cakes", img: hero, count: "18 cakes" },
            { name: "Macarons", img: macaron, count: "12 flavours" },
            { name: "Chocolate", img: chocolate, count: "9 pieces" },
            { name: "Morning Pastry", img: pastry, count: "14 bakes" },
          ].map((c) => (
            <Link
              to="/menu"
              key={c.name}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <div className="text-xs uppercase tracking-wider opacity-80">{c.count}</div>
                <div className="font-display text-2xl mt-1">{c.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Featured</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">This week at the atelier.</h2>
          <p className="mt-4 text-muted-foreground">
            A rotating selection of what our pastry chefs are most proud of right now.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* PROMISE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-card rounded-[2.5rem] p-8 sm:p-14">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { Icon: Leaf, t: "Single-origin", d: "Cocoa from Kerala, vanilla from Madagascar, butter from the Alps." },
              { Icon: Clock, t: "Baked at sunrise", d: "Never the night before. The shelf is empty by close, on purpose." },
              { Icon: Truck, t: "City-wide delivery", d: "Hand-delivered in temperature-controlled couriers across Mumbai." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="text-center md:text-left">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Best sellers</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">Loved a thousand times over.</h2>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Kind words</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">A table of regulars.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Aaliya R.", role: "Pastry critic", quote: "The rose velvet is the most considered cake I've eaten in India. Restrained, balanced, unforgettable." },
            { name: "Karan M.", role: "Regular", quote: "I drive across the city for the burnt basque. The caramel crown alone is worth the trip." },
            { name: "Sara D.", role: "Wedding client", quote: "Our cake was a quiet showstopper. Every guest asked, every guest came back for seconds." },
          ].map((t) => (
            <figure key={t.name} className="glass-card rounded-3xl p-6">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-base leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-6">
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* OFFER / CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground text-background p-10 sm:p-16">
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-primary)" }} />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-flex rounded-full bg-background/10 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.18em]">
                Limited · This weekend
              </span>
              <h2 className="mt-5 font-display text-4xl sm:text-5xl leading-tight">
                A complimentary macaron box with every signature cake.
              </h2>
              <p className="mt-4 max-w-xl text-background/70">
                Use code <span className="font-mono text-background">VELVET12</span> at checkout. While the morning batches last.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/menu">
                  <Button size="lg" className="rounded-full px-7 bg-background text-foreground hover:bg-background/90">
                    Shop now
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button size="lg" variant="outline" className="rounded-full px-7 border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
                    Book a tasting
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <img src={strawberry} alt="Special offer" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
