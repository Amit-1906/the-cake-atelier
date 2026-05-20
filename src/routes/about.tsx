import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import interior from "@/assets/about-interior.jpg";
import pastry from "@/assets/cake-pastry.jpg";
import macaron from "@/assets/cake-macaron.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Maison Velvet" },
      { name: "description", content: "The story of Maison Velvet — a small atelier devoted to single-origin cakes and patisserie." },
    ],
  }),
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Our story</p>
            <h1 className="mt-2 font-display text-5xl sm:text-6xl leading-[1.05]">
              Small batches.<br />
              <span className="gradient-text italic">Loud devotion.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Maison Velvet began in 2014 in a single rented oven in Bandra,
              with a quiet conviction that cake could be more than dessert —
              it could be a daily ritual. A decade later, we still bake every
              morning, and we still empty the shelves by close.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We work only with single-origin chocolate, French cultured butter,
              and farm eggs from a co-operative two hours outside the city.
              Nothing is frozen, nothing is mass-piped, nothing is rushed.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden glass-card">
              <img src={interior} alt="Maison Velvet atelier interior" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="glass-card rounded-[2rem] p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { k: "12+", v: "Years of craft" },
            { k: "48", v: "Signature recipes" },
            { k: "1.2k", v: "Five-star reviews" },
            { k: "07:00", v: "Daily fresh bake" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-4xl sm:text-5xl gradient-text">{s.k}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl bg-foreground text-background p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Mission</p>
          <h3 className="mt-3 font-display text-3xl">To bake the kind of thing you remember.</h3>
          <p className="mt-4 text-background/70 leading-relaxed">
            We measure success in moments — birthdays, anniversaries, ordinary
            Tuesdays made remarkable. Every cake leaves with a handwritten note.
          </p>
        </div>
        <div className="rounded-3xl bg-secondary text-secondary-foreground p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">Vision</p>
          <h3 className="mt-3 font-display text-3xl">A patisserie worth slowing down for.</h3>
          <p className="mt-4 text-foreground/70 leading-relaxed">
            In a city that never stops, our atelier is built to make you pause —
            for one bite, one coffee, one quiet afternoon.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">The atelier</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">The hands behind the cakes.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Naina Kapoor", role: "Founder · Head Pastry", img: interior },
            { name: "Aman Iyer", role: "Chocolatier", img: pastry },
            { name: "Mira Joshi", role: "Macaron Studio", img: macaron },
          ].map((m) => (
            <div key={m.name} className="group rounded-3xl overflow-hidden border border-border/60 bg-card">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="font-display text-xl">{m.name}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
