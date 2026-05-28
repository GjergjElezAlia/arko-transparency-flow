import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/arko/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Landmark, Target, Eye, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — ARKO" },
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
    <SiteLayout>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <Landmark className="h-8 w-8 mb-3 opacity-80" />
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Rreth ARKO</h1>
          <p className="mt-3 max-w-2xl opacity-85">
            ARKO — Arka e Rrjedhës Kombëtare — është një platformë e integruar shtetërore që sjell transparencë të
            plotë në financat publike të Republikës së Shqipërisë.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="grid gap-6 md:grid-cols-2">
          <Card><CardContent className="pt-6">
            <Target className="h-6 w-6 text-primary mb-3" />
            <h2 className="font-semibold text-lg">Misioni Ynë</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Të garantojmë llogaridhënie publike përmes të dhënave të verifikueshme dhe të aksesueshme për çdo qytetar shqiptar,
              gazetar dhe organ auditues.
            </p>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <Eye className="h-6 w-6 text-primary mb-3" />
            <h2 className="font-semibold text-lg">Vizioni</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Një Shqipëri ku çdo lek publik është i gjurmueshëm, ku korrupsioni zbulohet shpejt dhe ku besimi
              te institucionet rritet përmes hapjes.
            </p>
          </CardContent></Card>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-5">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Ekipi Zhvillues</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {team.map((m) => (
              <Card key={m.name}>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold">
                    {m.name[0]}
                  </div>
                  <div className="mt-3 font-semibold text-foreground">{m.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}