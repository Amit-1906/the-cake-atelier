import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { products } from "@/lib/products";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — Maison Velvet" },
      { name: "description", content: "A visual journey through our signature creations and atelier moments." },
    ],
  }),
});

function GalleryPage() {
  // Build a masonry-like rotation
  const tall = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]"];
  const list = [...products, ...products].slice(0, 12);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Gallery</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl">In quiet detail.</h1>
          <p className="mt-4 text-muted-foreground">A scrapbook of mornings at the atelier.</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {list.map((p, i) => (
            <figure
              key={`${p.id}-${i}`}
              className={`mb-5 break-inside-avoid group relative overflow-hidden rounded-3xl ${tall[i % tall.length]}`}
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <figcaption className="absolute bottom-0 inset-x-0 p-5 text-white translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <div className="font-display text-xl">{p.name}</div>
                <div className="text-xs uppercase tracking-wider opacity-80">{p.category}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
