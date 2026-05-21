import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Check, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const Route = createFileRoute("/_authenticated/booking")({
  component: BookingPage,
  head: () => ({
    meta: [
      { title: "Reservations — Maison Velvet" },
      { name: "description", content: "Reserve a table at our Bandra atelier — afternoon tea, tastings and private bookings." },
    ],
  }),
});

const times = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"];

function BookingPage() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [guests, setGuests] = useState(2);
  const [confirmed, setConfirmed] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-[2rem] p-10 text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-7 w-7" />
            </div>
            <h1 className="mt-6 font-display text-4xl">Reservation confirmed.</h1>
            <p className="mt-3 text-muted-foreground">
              We'll see you on{" "}
              <span className="text-foreground font-medium">
                {date ? format(date, "EEEE, MMMM d") : "your chosen date"}
              </span>{" "}
              at <span className="text-foreground font-medium">{time}</span> for{" "}
              <span className="text-foreground font-medium">{guests} {guests === 1 ? "guest" : "guests"}</span>.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">A confirmation note has been sent to your email.</p>
            <Button onClick={() => setConfirmed(false)} className="mt-8 rounded-full px-7" variant="outline">
              Make another booking
            </Button>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Reservations</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl">Reserve a table.</h1>
          <p className="mt-4 text-muted-foreground">Open daily, 8am to 10pm. Private bookings welcome.</p>
        </div>

        <form onSubmit={onSubmit} className="glass-card rounded-[2rem] p-6 sm:p-10 space-y-8">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Full name</label>
              <Input required className="mt-2 h-12 rounded-2xl bg-background/70" placeholder="Your name" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Phone</label>
              <Input required className="mt-2 h-12 rounded-2xl bg-background/70" placeholder="+91 …" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn("mt-2 w-full h-12 rounded-2xl justify-start bg-background/70", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Time</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {times.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTime(t)}
                    className={`h-10 px-4 rounded-full text-sm transition-all ${
                      time === t
                        ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                        : "bg-background/70 hover:bg-secondary text-foreground/80"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Guests</label>
            <div className="mt-2 flex items-center gap-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-background/70 border border-border px-5 h-12">
                <Users className="h-4 w-4 text-muted-foreground" />
                <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="h-7 w-7 rounded-full hover:bg-secondary">−</button>
                <span className="w-6 text-center font-medium">{guests}</span>
                <button type="button" onClick={() => setGuests((g) => Math.min(12, g + 1))} className="h-7 w-7 rounded-full hover:bg-secondary">+</button>
              </div>
              <span className="text-sm text-muted-foreground">Up to 12 per table</span>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Special requests</label>
            <Textarea rows={4} className="mt-2 rounded-2xl bg-background/70" placeholder="Birthday, anniversary, dietary notes…" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-muted-foreground">
              We hold tables for 15 minutes past the reservation time.
            </p>
            <Button
              type="submit"
              size="lg"
              disabled={!date || !time}
              className="rounded-full px-8 btn-glow"
            >
              Confirm reservation
            </Button>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}
