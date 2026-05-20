import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Cart — Maison Velvet" },
      { name: "description", content: "Review and check out your hand-crafted selections." },
    ],
  }),
});

function CartPage() {
  const [items, setItems] = useState(
    products.slice(0, 3).map((p) => ({ ...p, qty: 1 })),
  );

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 2500 ? 0 : 199;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  function setQty(id: string, qty: number) {
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  }
  function remove(id: string) {
    setItems((arr) => arr.filter((i) => i.id !== id));
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Your cart</p>
            <h1 className="mt-2 font-display text-5xl">Almost yours.</h1>
          </div>
          <Link to="/menu" className="text-sm text-muted-foreground hover:text-primary">Continue shopping</Link>
        </div>

        {items.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/menu"><Button className="mt-6 rounded-full px-7">Browse the menu</Button></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((i) => (
                <div key={i.id} className="glass-card rounded-3xl p-4 sm:p-5 flex gap-4 items-center">
                  <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden shrink-0">
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg leading-tight">{i.name}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{i.category}</div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-background/70 border border-border px-3 h-9">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="h-6 w-6 rounded-full hover:bg-secondary inline-flex items-center justify-center">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="h-6 w-6 rounded-full hover:bg-secondary inline-flex items-center justify-center">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive text-sm inline-flex items-center gap-1">
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="font-display text-xl text-right">₹{(i.price * i.qty).toLocaleString("en-IN")}</div>
                </div>
              ))}
            </div>

            <aside className="glass-card rounded-3xl p-6 h-fit lg:sticky lg:top-28">
              <h2 className="font-display text-2xl">Order summary</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>₹{subtotal.toLocaleString("en-IN")}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{delivery === 0 ? "Complimentary" : `₹${delivery}`}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>₹{tax.toLocaleString("en-IN")}</dd></div>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between text-base font-medium"><dt>Total</dt><dd className="font-display text-2xl">₹{total.toLocaleString("en-IN")}</dd></div>
              </dl>
              <Button size="lg" className="mt-6 w-full rounded-full btn-glow">Proceed to checkout</Button>
              <p className="mt-3 text-xs text-muted-foreground text-center">
                Free delivery across Mumbai on orders over ₹2,500.
              </p>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
