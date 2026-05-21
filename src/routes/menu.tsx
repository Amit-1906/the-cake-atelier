import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { Input } from "@/components/ui/input";
import { products as localProducts, categories, type Product } from "@/lib/products";
import { listCakes } from "@/lib/firebase/firestore";
import { isFirebaseConfigured } from "@/lib/firebase/config";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Menu — Maison Velvet" },
      { name: "description", content: "Browse our full atelier menu of cakes, macarons, pastry and seasonal specials." },
    ],
  }),
});

function MenuPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"featured" | "low" | "high" | "rating">("featured");
  const [items, setItems] = useState<Product[]>(localProducts);
  const [source, setSource] = useState<"local" | "firestore">("local");

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const cakes = await listCakes();
        if (!cancelled && cakes.length > 0) {
          setItems(cakes as unknown as Product[]);
          setSource("firestore");
        }
      } catch (e) {
        console.warn("Firestore listCakes failed, using local catalog.", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = items.filter(
      (p) => (active === "All" || p.category === active) && p.name.toLowerCase().includes(q.toLowerCase()),
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [items, active, q, sort]);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">The Menu</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl">Today at the atelier.</h1>
          <p className="mt-4 text-muted-foreground">
            Hand-picked, hand-finished, never duplicated.
            {source === "firestore" && <span className="ml-2 text-xs uppercase tracking-wider text-primary">· Live</span>}
          </p>
        </div>

        <div className="glass-card rounded-3xl p-4 sm:p-5 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cakes, flavours, ingredients…"
              className="pl-11 h-11 rounded-full bg-background/70 border-border"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 h-9 rounded-full text-sm transition-all ${
                  active === c
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "bg-background/60 hover:bg-secondary text-foreground/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="h-11 px-4 rounded-full bg-background/70 border border-border text-sm"
          >
            <option value="featured">Featured</option>
            <option value="low">Price · Low to high</option>
            <option value="high">Price · High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            Nothing matches that search. Try another flavour.
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
