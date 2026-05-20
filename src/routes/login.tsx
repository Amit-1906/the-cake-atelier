import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/site/Navbar";
import hero from "@/assets/hero-cake.jpg";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Sign in — Maison Velvet" }] }),
});

function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 hero-bg">
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="hidden lg:block relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-card">
            <img src={hero} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-background">
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">Members only</p>
              <h2 className="mt-3 font-display text-4xl">Welcome back to the atelier.</h2>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-8 sm:p-10">
            <h1 className="font-display text-4xl">Sign in</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              New here?{" "}
              <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <Button variant="outline" className="rounded-full h-11">Google</Button>
              <Button variant="outline" className="rounded-full h-11">Apple</Button>
            </div>
            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <Input required type="email" className="mt-2 h-12 rounded-2xl bg-background/70" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Password</label>
                <Input required type="password" className="mt-2 h-12 rounded-2xl bg-background/70" />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full btn-glow">Sign in</Button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
