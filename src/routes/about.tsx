import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/arko/MobileLayout";
import { Landmark, Target, Eye, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ARKO" },
      { name: "description", content: "Rreth platformës ARKO dhe ekipit zhvillues." },
    ],
  }),
  component: Page,
});

const team = [
  { name: "Amir", role: "Project Lead" },
  { name: "Armand", role: "Backend Engineer" },
  { name: "Henri", role: "Frontend Engineer" },
  { name: "Sindrit", role: "Data & Analytics" },
  { name: "Klestian", role: "Security & Compliance" },
];

function Page() {
  return (
    <MobileLayout transparentHeader title="About">
      <section className="relative -mt-14 pt-14 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute -top-16 -right-12 h-56 w-56 rounded-full bg-[var(--gold)]/15 blur-3xl -z-10" />
        <div className="px-5 pt-8 pb-10 animate-[fade-up_0.5s_ease-out]">
          <div className="h-11 w-11 rounded-xl glass-card flex items-center justify-center mb-3">
            <Landmark className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Rreth ARKO</h1>
          <p className="mt-2 text-sm opacity-80 leading-relaxed">
            Arka e Rrjedhës Kombëtare — platforma e integruar shtetërore për transparencë të plotë në financat publike.
          </p>
        </div>
      </section>

      <section className="px-5 -mt-4 relative z-10 space-y-3 stagger">
        <Card icon={<Target className="h-4 w-4" />} title="Misioni Ynë" body="Të garantojmë llogaridhënie publike përmes të dhënave të verifikueshme dhe të aksesueshme për çdo qytetar." />
        <Card icon={<Eye className="h-4 w-4" />} title="Vizioni" body="Një Shqipëri ku çdo lek publik është i gjurmueshëm dhe besimi te institucionet rritet përmes hapjes." />
      </section>

      <section className="px-5 pt-10">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold">Ekipi Zhvillues</h2>
        </div>
        <div className="space-y-2.5 stagger">
          {team.map((m) => (
            <div key={m.name} className="rounded-2xl border border-border bg-card p-3.5 flex items-center gap-3 tap-scale">
              <div
                className="h-11 w-11 rounded-full flex items-center justify-center text-sm font-semibold text-primary-foreground shrink-0"
                style={{ background: "var(--gradient-hero)" }}
              >
                {m.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{m.name}</div>
                <div className="text-[11px] text-muted-foreground">{m.role}</div>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--gold)]">ARKO</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pt-10 pb-4">
        <div className="rounded-2xl border border-border bg-muted/40 p-4 text-[11px] text-muted-foreground leading-relaxed">
          Në përputhje me Ligjin Nr. 9887 "Për Mbrojtjen e të Dhënave Personale". Të gjitha të dhënat individuale janë të anonimizuara.
        </div>
      </section>
    </MobileLayout>
  );
}

function Card({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-premium)] tap-scale">
      <div className="flex items-center gap-2 text-primary">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
        <h2 className="font-semibold text-sm">{title}</h2>
      </div>
      <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}