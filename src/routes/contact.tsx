import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Maison Velvet" },
      { name: "description", content: "Visit our Bandra atelier or send us a note. We answer every message ourselves." },
    ],
  }),
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent. We'll write back within a day.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl">Say hello.</h1>
          <p className="mt-4 text-muted-foreground">For orders, press, or the simple pleasure of conversation.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <form onSubmit={onSubmit} className="lg:col-span-3 glass-card rounded-3xl p-6 sm:p-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Name</label>
                <Input required className="mt-2 h-12 rounded-2xl bg-background/70" placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <Input required type="email" className="mt-2 h-12 rounded-2xl bg-background/70" placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Subject</label>
              <Input required className="mt-2 h-12 rounded-2xl bg-background/70" placeholder="What would you like to talk about?" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
              <Textarea required rows={6} className="mt-2 rounded-2xl bg-background/70" placeholder="Tell us a little more…" />
            </div>
            <Button type="submit" disabled={sending} size="lg" className="rounded-full px-7 gap-2 btn-glow">
              <Send className="h-4 w-4" /> {sending ? "Sending…" : "Send message"}
            </Button>
          </form>

          <aside className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-3xl p-6 space-y-5">
              {[
                { Icon: MapPin, t: "Visit", d: "14 Linking Road, Bandra West, Mumbai 400050" },
                { Icon: Phone, t: "Call", d: "+91 98765 43210" },
                { Icon: Mail, t: "Write", d: "hello@maisonvelvet.co" },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="flex gap-4">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{t}</div>
                    <div className="text-sm mt-1">{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl overflow-hidden border border-border/60 aspect-[4/3]">
              <iframe
                title="Maison Velvet map"
                src="https://www.google.com/maps?q=Bandra+West,+Mumbai&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
