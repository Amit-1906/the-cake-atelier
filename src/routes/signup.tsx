import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/site/Navbar";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import macaron from "@/assets/cake-macaron.jpg";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({ meta: [{ title: "Create account — Maison Velvet" }] }),
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signUpWithEmail(form);
      toast.success("Welcome to Maison Velvet.");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Account created.");
      navigate({ to: "/" });
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
          <div className="glass-card rounded-[2rem] p-8 sm:p-10 order-2 lg:order-1">
            <h1 className="font-display text-4xl">Create an account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Already a member?{" "}
              <Link to="/login" className="text-primary hover:underline">Sign in</Link>
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">First name</label>
                  <Input required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="mt-2 h-12 rounded-2xl bg-background/70" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Last name</label>
                  <Input required value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="mt-2 h-12 rounded-2xl bg-background/70" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <Input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="mt-2 h-12 rounded-2xl bg-background/70" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Password</label>
                <Input required type="password" minLength={6} value={form.password} onChange={(e) => set("password", e.target.value)} className="mt-2 h-12 rounded-2xl bg-background/70" />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="w-full rounded-full btn-glow">
                {loading ? "Creating account…" : "Create account"}
              </Button>
            </form>
          </div>

          <div className="hidden lg:block relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-card order-1 lg:order-2">
            <img src={macaron} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-background">
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">Join the atelier</p>
              <h2 className="mt-3 font-display text-4xl">Earn one macaron with every order.</h2>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
