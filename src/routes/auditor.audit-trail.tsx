import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, FileText, Search } from "lucide-react";
import { transactions, formatLEK, detectAnomalies } from "@/lib/arko-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auditor/audit-trail")({
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");

  const rows = transactions
    .filter((t) => {
      if (!q) return true;
      const s = q.toLowerCase();
      return t.id.toLowerCase().includes(s) || t.recipient.toLowerCase().includes(s) || t.nipt.toLowerCase().includes(s);
    })
    .map((t) => ({ tx: t, anomalies: detectAnomalies(t, transactions) }));

  const exportCSV = () => {
    const header = ["ID", "Fondi", "Marrësi", "NIPT", "Shuma (LEK)", "Data", "Statusi", "Anomalitë"].join(",");
    const lines = rows.map(({ tx, anomalies }) =>
      [tx.id, tx.fund, `"${tx.recipient}"`, tx.nipt, tx.amount, tx.date, tx.status, anomalies.map((a) => a.type).join("|")].join(","),
    );
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `arko-audit-trail-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV u shkarkua me sukses");
  };

  const exportPDF = () => toast.info("Gjenerimi i PDF (simuluar)", { description: "Raporti zyrtar do të dorëzohet brenda 24 orëve." });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gjurma e Auditimit</h1>
          <p className="text-sm text-muted-foreground">Të dhëna të detajuara mbi çdo transaksion publik.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV}><Download className="h-4 w-4 mr-1.5" /> CSV</Button>
          <Button onClick={exportPDF}><FileText className="h-4 w-4 mr-1.5" /> PDF</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Të gjitha transaksionet</CardTitle>
          <CardDescription>Rreshtat e theksuar me të kuqe sinjalizojnë anomali të zbuluara automatikisht.</CardDescription>
          <div className="relative max-w-md mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Kërkoni ID, kompani ose NIPT..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Fondi Origjinues</TableHead>
                  <TableHead>NIPT Marrësi</TableHead>
                  <TableHead className="text-right">Shuma (LEK)</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Statusi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(({ tx, anomalies }) => {
                  const flagged = anomalies.length > 0;
                  return (
                    <TableRow
                      key={tx.id}
                      className={cn(flagged && "bg-destructive/10 hover:bg-destructive/15 border-l-4 border-l-destructive")}
                    >
                      <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                      <TableCell className="text-sm">{tx.fund}</TableCell>
                      <TableCell className="font-mono text-xs">
                        <div>{tx.nipt}</div>
                        <div className="text-muted-foreground text-[11px]">{tx.recipient}</div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatLEK(tx.amount)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(tx.date).toLocaleString("sq-AL")}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant={tx.status === "Paguar" ? "secondary" : tx.status === "Refuzuar" ? "destructive" : "outline"}>
                            {tx.status}
                          </Badge>
                          {anomalies.map((a) => (
                            <Badge key={a.type} variant="destructive" className="text-[10px]">{a.type}</Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}