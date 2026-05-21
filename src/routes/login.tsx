import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/site/Navbar";
import { signInWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import hero from "@/assets/hero-cake.jpg";

type Search = { redirect?: string };

export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({ meta: [{ title: "Sign in — Maison Velvet" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      toast.success("Welcome back.");
      navigate({ to: redirect || "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Welcome back.");
      navigate({ to: redirect || "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

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

            <div className="mt-8 grid grid-cols-1 gap-3">
              <Button onClick={handleGoogle} disabled={loading} variant="outline" className="rounded-full h-11">
                Continue with Google
              </Button>
            </div>
            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 h-12 rounded-2xl bg-background/70" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Password</label>
                <Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 h-12 rounded-2xl bg-background/70" />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="w-full rounded-full btn-glow">
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
