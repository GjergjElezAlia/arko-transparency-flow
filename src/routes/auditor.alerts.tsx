import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Copy, ShieldAlert, UserX } from "lucide-react";
import { transactions, formatLEK, detectAnomalies } from "@/lib/arko-data";

export const Route = createFileRoute("/auditor/alerts")({
  component: Page,
});

function Page() {
  const flagged = transactions
    .map((tx) => ({ tx, anomalies: detectAnomalies(tx, transactions) }))
    .filter((r) => r.anomalies.length > 0);

  const counts = {
    high: flagged.filter((r) => r.anomalies.some((a) => a.type === "High Risk")).length,
    dup: flagged.filter((r) => r.anomalies.some((a) => a.type === "Duplicate")).length,
    unreg: flagged.filter((r) => r.anomalies.some((a) => a.type === "Unregistered")).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-destructive" /> Sinjalizime Anomalish
        </h1>
        <p className="text-sm text-muted-foreground">Transaksione që kërkojnë vëmendje të menjëhershme nga audituesi.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <AlertCard icon={<ShieldAlert />} title="Rrezik i Lartë" count={counts.high} desc="Shuma > 100,000,000 LEK" />
        <AlertCard icon={<Copy />} title="Të Dyfishta" count={counts.dup} desc="Marrës i njëjtë brenda 24h" />
        <AlertCard icon={<UserX />} title="Të Paregjistruar" count={counts.unreg} desc="NIPT jashtë regjistrit zyrtar" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista e Plotë e Sinjalizimeve ({flagged.length})</CardTitle>
          <CardDescription>Të gjitha rreshtat janë të theksuar dhe kërkojnë veprim.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lloji</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Marrësi</TableHead>
                  <TableHead className="text-right">Shuma</TableHead>
                  <TableHead>Arsyeja</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flagged.map(({ tx, anomalies }) =>
                  anomalies.map((a, i) => (
                    <TableRow key={`${tx.id}-${i}`} className="bg-destructive/10 hover:bg-destructive/15 border-l-4 border-l-destructive">
                      <TableCell><Badge variant="destructive">{a.type}</Badge></TableCell>
                      <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                      <TableCell>
                        <div className="font-medium text-sm">{tx.recipient}</div>
                        <div className="font-mono text-[11px] text-muted-foreground">{tx.nipt}</div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm font-semibold">{formatLEK(tx.amount)}</TableCell>
                      <TableCell className="text-sm">{a.reason}</TableCell>
                    </TableRow>
                  )),
                )}
                {flagged.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Asnjë anomali e zbuluar.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AlertCard({ icon, title, count, desc }: { icon: React.ReactNode; title: string; count: number; desc: string }) {
  return (
    <Card className="border-destructive/30">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-destructive text-sm font-medium">
          <span className="h-4 w-4 inline-flex">{icon}</span> {title}
        </div>
        <div className="mt-2 text-3xl font-semibold text-destructive">{count}</div>
        <div className="text-xs text-muted-foreground mt-1">{desc}</div>
      </CardContent>
    </Card>
  );
}