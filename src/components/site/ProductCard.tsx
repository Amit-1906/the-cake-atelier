import { Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-card border border-border/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium text-primary">
            {product.badge}
          </span>
        )}
        <button
          aria-label="Add to cart"
          className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg leading-tight">{product.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            {product.rating}
          </div>
        </div>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl">₹{product.price.toLocaleString("en-IN")}</span>
          <Button size="sm" variant="ghost" className="rounded-full text-primary hover:text-primary">
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
