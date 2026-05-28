import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, CalendarRange } from "lucide-react";
import { toast } from "sonner";
import { transactions, formatLEK, detectAnomalies } from "@/lib/arko-data";

export const Route = createFileRoute("/auditor/reports")({
  component: Page,
});

const reports = [
  { id: "RPT-Q4-2026", title: "Raport Tremujor Q4 2026", desc: "Përmbledhje e të gjitha shpenzimeve publike për tremujorin e katërt.", period: "Tetor – Dhjetor 2026" },
  { id: "RPT-ANOM-NOV", title: "Raport Anomalish — Nëntor", desc: "Lista e plotë e transaksioneve të sinjalizuara gjatë muajit.", period: "Nëntor 2026" },
  { id: "RPT-MIN-INFRA", title: "Auditim — Ministria e Infrastrukturës", desc: "Analizë e thelluar e kontratave të ndërtimit.", period: "Viti fiskal 2026" },
  { id: "RPT-VENDORS", title: "Regjistri i Furnitorëve", desc: "Të gjithë furnitorët aktivë me NIPT dhe statusin e regjistrimit.", period: "Përditësuar mujore" },
];

function Page() {
  const flagged = transactions.filter((t) => detectAnomalies(t, transactions).length > 0).length;
  const total = transactions.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Raporte Zyrtare</h1>
        <p className="text-sm text-muted-foreground">Gjeneroni dhe shkarkoni raporte për Kontrollin e Lartë të Shtetit.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="pt-6">
          <div className="text-sm text-muted-foreground">Vëllimi i Auditimit</div>
          <div className="mt-2 text-2xl font-semibold">{formatLEK(total)}</div>
        </CardContent></Card>
        <Card><CardContent className="pt-6">
          <div className="text-sm text-muted-foreground">Transaksione të Analizuara</div>
          <div className="mt-2 text-2xl font-semibold">{transactions.length}</div>
        </CardContent></Card>
        <Card><CardContent className="pt-6">
          <div className="text-sm text-muted-foreground">Sinjalizime për Raport</div>
          <div className="mt-2 text-2xl font-semibold text-destructive">{flagged}</div>
        </CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <div>
                  <CardTitle className="text-base">{r.title}</CardTitle>
                  <CardDescription className="mt-1">{r.desc}</CardDescription>
                </div>
                <FileText className="h-5 w-5 text-primary shrink-0" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-xs text-muted-foreground mb-3">
                <CalendarRange className="h-3.5 w-3.5 mr-1.5" /> {r.period}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => toast.success(`${r.id} CSV i shkarkuar`)}>
                  <Download className="h-3.5 w-3.5 mr-1.5" /> CSV
                </Button>
                <Button size="sm" onClick={() => toast.success(`${r.id} PDF i shkarkuar`)}>
                  <FileText className="h-3.5 w-3.5 mr-1.5" /> PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}