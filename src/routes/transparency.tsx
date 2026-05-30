import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MobileLayout } from "@/components/arko/MobileLayout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, PieChart as PieIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ministryBudget, monthlySpending, transactions, formatLEK } from "@/lib/arko-data";

export const Route = createFileRoute("/transparency")({
  head: () => ({
    meta: [
      { title: "Të Dhëna Publike — ARKO" },
      { name: "description", content: "Të dhëna publike mbi buxhetin, kontraktorët dhe shpenzimet e qeverisë shqiptare." },
    ],
  }),
  component: Page,
});

const COLORS = [
  "oklch(0.235 0.08 256)",
  "oklch(0.40 0.10 250)",
  "oklch(0.55 0.10 230)",
  "oklch(0.78 0.13 85)",
  "oklch(0.65 0.15 35)",
  "oklch(0.55 0.08 180)",
];

function Page() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return transactions;
    const s = q.toLowerCase();
    return transactions.filter((t) => t.recipient.toLowerCase().includes(s) || t.nipt.toLowerCase().includes(s));
  }, [q]);

  return (
    <MobileLayout transparentHeader title="Të Dhëna">
      <section className="relative -mt-14 pt-14 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute -top-16 -right-12 h-56 w-56 rounded-full bg-[var(--gold)]/15 blur-3xl -z-10" />
        <div className="px-5 pt-8 pb-14 animate-[fade-up_0.5s_ease-out]">
          <h1 className="text-2xl font-semibold tracking-tight">Paneli i Transparencës</h1>
          <p className="mt-2 text-sm opacity-80 leading-relaxed">
            Kërkoni kontraktorë dhe shqyrtoni shpenzimet publike.
          </p>
        </div>
      </section>

      <section className="px-5 -mt-10 relative z-10">
        <div className="rounded-2xl bg-card border border-border p-3 shadow-[var(--shadow-premium)]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Kompani ose NIPT…"
              className="pl-9 h-11 rounded-xl border-0 bg-muted/60"
            />
          </div>
          {q && (
            <div className="mt-2 px-1 text-[11px] text-muted-foreground">{filtered.length} rezultate për "{q}"</div>
          )}
        </div>
      </section>

      <section className="px-5 pt-6 space-y-4 stagger">
        <ChartCard icon={<PieIcon className="h-4 w-4" />} title="Buxheti sipas Ministrive" sub="Viti 2026">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ministryBudget} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                  {ministryBudget.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => formatLEK(v)} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {ministryBudget.map((m, i) => (
              <div key={m.name} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-2 w-2 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="truncate">{m.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard icon={<TrendingUp className="h-4 w-4" />} title="Tendencat e Shpenzimeve" sub="6 muajt e fundit">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySpending} margin={{ top: 6, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `${(v / 1_000_000_000).toFixed(0)}Mld`} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => formatLEK(v)} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
                <Bar dataKey="spending" fill="oklch(0.235 0.08 256)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="px-5 pt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Transaksionet e fundit</h2>
          <span className="text-[10px] text-muted-foreground">{filtered.length}</span>
        </div>
        <div className="space-y-2 stagger">
          {filtered.slice(0, 12).map((t) => (
            <div key={t.id} className="rounded-2xl border border-border bg-card p-3.5 tap-scale">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{t.recipient}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {new Date(t.date).toLocaleDateString("sq-AL")} · {t.region}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-sm font-semibold">{formatLEK(t.amount)}</div>
                  <Badge variant="secondary" className="mt-1 text-[9px] font-medium">{t.category}</Badge>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-10">Asnjë rezultat.</div>
          )}
        </div>
      </section>
    </MobileLayout>
  );
}

function ChartCard({ icon, title, sub, children }: { icon: React.ReactNode; title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-premium)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
          <div>
            <div className="text-sm font-semibold leading-tight">{title}</div>
            <div className="text-[10px] text-muted-foreground">{sub}</div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}