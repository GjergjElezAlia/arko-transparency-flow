import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileLayout } from "@/components/arko/MobileLayout";
import { ArrowUpRight, Banknote, FileSignature, Building2, ShieldCheck, LineChart, Lock, Sparkles } from "lucide-react";
import { stats, formatLEK, transactions, detectAnomalies } from "@/lib/arko-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARKO — Transparenca e Financave Publike" },
      { name: "description", content: "Platformë shtetërore për transparencën dhe auditimin e financave publike në Republikën e Shqipërisë." },
    ],
  }),
  component: Index,
});

function Index() {
  const flagged = transactions.filter((t) => detectAnomalies(t, transactions).length > 0).length;

  return (
    <MobileLayout transparentHeader>
      <section className="relative isolate -mt-14 pt-14 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl -z-10" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl -z-10" />

        <div className="px-5 pt-8 pb-12">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-white/10 border border-white/15 animate-[fade-up_0.5s_ease-out]">
            <Sparkles className="h-3 w-3 text-[var(--gold)]" /> Platformë Zyrtare
          </div>
          <h1 className="mt-4 text-[28px] leading-tight font-semibold tracking-tight animate-[fade-up_0.55s_ease-out_0.05s_both]">
            Transparencë e plotë për çdo lek <span className="text-[var(--gold)]">publik</span>.
          </h1>
          <p className="mt-3 text-sm opacity-80 leading-relaxed animate-[fade-up_0.6s_ease-out_0.1s_both]">
            Ndiqni në kohë reale buxhetin, kontratat dhe shpenzimet e Republikës së Shqipërisë.
          </p>

          <div className="mt-6 flex gap-2.5 animate-[fade-up_0.6s_ease-out_0.15s_both]">
            <Link
              to="/transparency"
              className="flex-1 h-12 rounded-xl bg-white text-primary font-semibold text-sm flex items-center justify-center gap-1.5 tap-scale shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
            >
              Eksploroni <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="h-12 px-4 rounded-xl glass-card font-medium text-sm flex items-center gap-1.5 tap-scale"
            >
              <Lock className="h-3.5 w-3.5" /> Auditor
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2 stagger">
            <HeroStat label="Buxheti" value={`${(stats.totalBudget / 1_000_000_000).toFixed(0)}Mld`} />
            <HeroStat label="Kontrata" value={stats.activeContracts.toLocaleString("sq-AL")} />
            <HeroStat label="Anomali" value={flagged.toString()} accent />
          </div>
        </div>
      </section>

      <section className="px-5 -mt-6 relative z-10">
        <div className="space-y-3 stagger">
          <PremiumStat icon={Banknote} label="Buxheti Total i Ndjekur" value={formatLEK(stats.totalBudget)} sub="Viti fiskal 2026" />
          <PremiumStat icon={FileSignature} label="Kontrata Aktive" value={stats.activeContracts.toLocaleString("sq-AL")} sub="Në 12 ministri" />
          <PremiumStat icon={Building2} label="Furnitorë të Regjistruar" value={stats.registeredVendors.toLocaleString("sq-AL")} sub="Sektori publik & privat" />
        </div>
      </section>

      <section className="px-5 pt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Çfarë ofron ARKO</h2>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">v1.0</span>
        </div>
        <div className="space-y-3 stagger">
          <Feature icon={LineChart} title="Të dhëna në kohë reale" body="Vizualizime interaktive të shpenzimeve sipas ministrive dhe rajoneve." />
          <Feature icon={ShieldCheck} title="Detektim anomalish" body="Algoritme që sinjalizojnë transaksione të dyshimta automatikisht." />
          <Feature icon={Lock} title="Portal i sigurt" body="Qasje e mbrojtur për auditues qeveritarë me gjurmë auditimi." />
        </div>
      </section>

      <section className="px-5 pt-10 pb-4">
        <div className="rounded-2xl p-5 text-primary-foreground relative overflow-hidden tap-scale" style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--gold)]/25 blur-2xl" />
          <div className="text-[10px] uppercase tracking-widest opacity-70">Ligji Nr. 9887</div>
          <div className="mt-1 font-semibold text-base">Të dhënat e plota, të anonimizuara.</div>
          <p className="mt-1.5 text-xs opacity-80 leading-relaxed">
            Në përputhje me legjislacionin shqiptar për mbrojtjen e të dhënave personale.
          </p>
        </div>
      </section>
    </MobileLayout>
  );
}

function HeroStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl glass-card px-2.5 py-2.5">
      <div className="text-[9px] uppercase tracking-widest opacity-70">{label}</div>
      <div className={`mt-1 text-base font-semibold tracking-tight ${accent ? "text-[var(--gold)]" : ""}`}>{value}</div>
    </div>
  );
}

function PremiumStat({ icon: Icon, label, value, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-premium)] tap-scale">
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-2 text-xl font-semibold tracking-tight">{value}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
}

function Feature({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex gap-3 tap-scale">
      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </div>
  );
}