import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, ShoppingBag, Package, CalendarDays, BarChart3, Settings, LogOut, ArrowUpRight, ArrowDownRight, Search, Bell,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin · Maison Velvet" }] }),
});

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin", label: "Orders", icon: ShoppingBag },
  { to: "/admin", label: "Products", icon: Package },
  { to: "/admin", label: "Reservations", icon: CalendarDays },
  { to: "/admin", label: "Analytics", icon: BarChart3 },
  { to: "/admin", label: "Settings", icon: Settings },
];

function AdminPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/40">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-border bg-background/80 backdrop-blur flex items-center gap-4 px-4 sm:px-6">
            <SidebarTrigger />
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search orders, products…" className="pl-9 h-10 rounded-full bg-muted border-0" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full"><Bell className="h-4 w-4" /></Button>
            <div className="h-9 w-9 rounded-full bg-[var(--gradient-primary)] text-primary-foreground inline-flex items-center justify-center text-sm font-medium">N</div>
          </header>

          <main className="flex-1 p-4 sm:p-8 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Dashboard</p>
              <h1 className="mt-1 font-display text-3xl sm:text-4xl">Good morning, Naina.</h1>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { l: "Revenue today", v: "₹84,210", c: "+12.4%", up: true },
                { l: "Orders", v: "127", c: "+8 vs yest.", up: true },
                { l: "Reservations", v: "42", c: "-3 vs yest.", up: false },
                { l: "Avg. rating", v: "4.92", c: "+0.04", up: true },
              ].map((s) => (
                <div key={s.l} className="bg-card rounded-2xl p-5 border border-border">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  <div className="mt-2 font-display text-3xl">{s.v}</div>
                  <div className={`mt-3 inline-flex items-center gap-1 text-xs ${s.up ? "text-emerald-600" : "text-destructive"}`}>
                    {s.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {s.c}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart + recent */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl">Revenue · last 14 days</h2>
                  <select className="text-sm bg-muted rounded-full px-3 h-8 border-0">
                    <option>Daily</option><option>Weekly</option>
                  </select>
                </div>
                <FakeChart />
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-display text-xl">Today's reservations</h2>
                <ul className="mt-5 space-y-4">
                  {[
                    { n: "K. Mehta", t: "13:00", g: 4 },
                    { n: "S. Iyer", t: "15:30", g: 2 },
                    { n: "A. Rao", t: "17:00", g: 6 },
                    { n: "P. Shah", t: "19:00", g: 3 },
                  ].map((r) => (
                    <li key={r.n} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{r.n}</div>
                        <div className="text-xs text-muted-foreground">{r.g} guests</div>
                      </div>
                      <span className="text-xs rounded-full bg-secondary text-secondary-foreground px-3 py-1">{r.t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Orders table */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-6 flex items-center justify-between">
                <h2 className="font-display text-xl">Recent orders</h2>
                <Button variant="outline" size="sm" className="rounded-full">View all</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60 text-muted-foreground text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left font-medium px-6 py-3">Order</th>
                      <th className="text-left font-medium px-6 py-3">Item</th>
                      <th className="text-left font-medium px-6 py-3">Customer</th>
                      <th className="text-left font-medium px-6 py-3">Status</th>
                      <th className="text-right font-medium px-6 py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 6).map((p, i) => {
                      const status = ["Delivered", "Baking", "Out for delivery", "New", "Delivered", "Baking"][i];
                      const color = { Delivered: "bg-emerald-100 text-emerald-700", Baking: "bg-amber-100 text-amber-700", "Out for delivery": "bg-sky-100 text-sky-700", New: "bg-secondary text-secondary-foreground" }[status]!;
                      return (
                        <tr key={p.id} className="border-t border-border">
                          <td className="px-6 py-4 font-mono text-xs">#MV-{1024 + i}</td>
                          <td className="px-6 py-4">{p.name}</td>
                          <td className="px-6 py-4 text-muted-foreground">{["Karan M.", "Aaliya R.", "Sara D.", "Vikram P.", "Neha S.", "Rhea J."][i]}</td>
                          <td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs ${color}`}>{status}</span></td>
                          <td className="px-6 py-4 text-right font-medium">₹{p.price.toLocaleString("en-IN")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AdminSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="px-4 py-5 flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gradient-primary)] text-primary-foreground font-display">M</span>
          <span className="font-display text-lg">Velvet</span>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((n) => (
                <SidebarMenuItem key={n.label}>
                  <SidebarMenuButton asChild isActive={n.label === "Overview" && path === "/admin"}>
                    <Link to={n.to}>
                      <n.icon className="h-4 w-4" />
                      <span>{n.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/"><LogOut className="h-4 w-4" /><span>Back to site</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function FakeChart() {
  const data = [32, 48, 40, 60, 55, 72, 68, 84, 76, 92, 88, 100, 94, 110];
  const max = Math.max(...data);
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 90}`).join(" ");
  return (
    <div className="mt-6 h-56">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.665 0.215 9)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0.665 0.215 9)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${pts} 100,100`} fill="url(#g)" />
        <polyline points={pts} fill="none" stroke="oklch(0.665 0.215 9)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
