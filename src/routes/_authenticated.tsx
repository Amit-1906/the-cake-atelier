import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/AuthContext";

// Pathless layout that gates every child route.
// Children: src/routes/_authenticated/*.tsx
export const Route = createFileRoute("/_authenticated")({
  component: AuthGate,
});

function AuthGate() {
  const { user, loading, configured } = useAuth();

  useEffect(() => {
    if (!configured || loading) return;
    if (!user && typeof window !== "undefined") {
      const target = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      window.location.replace(target);
    }
  }, [loading, user, configured]);

  if (!configured) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-3xl p-10 max-w-md text-center">
          <h2 className="font-display text-2xl">Firebase not configured</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Add your Firebase web config to <code>.env</code> (see <code>.env.example</code>) and reload.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return <Outlet />;
}

// Keep auth listener warm in case nothing else has subscribed yet.
if (typeof window !== "undefined" && auth) {
  onAuthStateChanged(auth, () => {});
}

