import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/arko/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Banknote, FileSignature, Building2, ShieldCheck, LineChart, Lock } from "lucide-react";
import { stats, formatLEK } from "@/lib/arko-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARKO — Transparenca e Financave Publike Shqiptare" },
      { name: "description", content: "Platformë shtetërore për transparencën dhe auditimin e financave publike në Republikën e Shqipërisë." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider opacity-80 mb-4">
              <ShieldCheck className="h-4 w-4" /> Platformë Zyrtare Demo
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Promoting Transparency in Albanian Public Finance.
            </h1>
            <p className="mt-5 text-lg opacity-85 max-w-2xl">
              ARKO ofron qasje në kohë reale në buxhetin, kontratat dhe shpenzimet publike të Republikës së Shqipërisë —
              duke fuqizuar qytetarët, gazetarët dhe audituesit me të dhëna të verifikueshme.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/transparency">Eksploroni Të Dhënat <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/login"><Lock className="mr-2 h-4 w-4" /> Auditor Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12 md:-mt-16 relative z-10">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard icon={<Banknote className="h-5 w-5" />} label="Buxheti Total i Ndjekur" value={formatLEK(stats.totalBudget)} sub="Viti fiskal 2026" />
          <StatCard icon={<FileSignature className="h-5 w-5" />} label="Kontrata Aktive" value={stats.activeContracts.toLocaleString("sq-AL")} sub="Në 12 ministri" />
          <StatCard icon={<Building2 className="h-5 w-5" />} label="Furnitorë të Regjistruar" value={stats.registeredVendors.toLocaleString("sq-AL")} sub="Sektori publik & privat" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          <Feature icon={<LineChart className="h-5 w-5" />} title="Të dhëna në kohë reale" body="Vizualizime interaktive të shpenzimeve sipas ministrive, kategorive dhe rajoneve." />
          <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Detektim anomalish" body="Algoritme që sinjalizojnë transaksione të dyfishta, me rrezik të lartë ose furnitorë të paregjistruar." />
          <Feature icon={<Lock className="h-5 w-5" />} title="Portal i sigurt auditues" body="Qasje e mbrojtur për auditues qeveritarë me gjurmë auditimi të detajuara." />
        </div>
      </section>
    </SiteLayout>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <Card className="shadow-sm border-border/80">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <span className="text-primary">{icon}</span> {label}
        </div>
        <div className="mt-3 text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{sub}</div>
      </CardContent>
    </Card>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div>
      <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
      <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
