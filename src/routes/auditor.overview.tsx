import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { transactions, formatLEK, detectAnomalies, stats } from "@/lib/arko-data";
import { AlertTriangle, CheckCircle2, Wallet, FileSignature } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/auditor/overview")({
  component: Page,
});

function Page() {
  const flagged = transactions.filter((t) => detectAnomalies(t, transactions).length > 0);
  const totalSpent = transactions.reduce((s, t) => s + t.amount, 0);
  const byCat = Object.entries(
    transactions.reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {}),
  ).map(([category, amount]) => ({ category, amount }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Pasqyrë e Përgjithshme</h1>
        <p className="text-sm text-muted-foreground">Statusi aktual i auditimit të financave publike.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KPI icon={<Wallet className="h-4 w-4" />} label="Buxheti Total" value={formatLEK(stats.totalBudget)} />
        <KPI icon={<FileSignature className="h-4 w-4" />} label="Transaksione" value={transactions.length.toString()} sub={formatLEK(totalSpent)} />
        <KPI icon={<AlertTriangle className="h-4 w-4" />} label="Anomali të Zbuluara" value={flagged.length.toString()} danger />
        <KPI icon={<CheckCircle2 className="h-4 w-4" />} label="Të Pastra" value={(transactions.length - flagged.length).toString()} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shpenzime sipas Kategorisë</CardTitle>
          <CardDescription>Përmbledhje e periudhës aktuale të auditimit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCat}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="category" className="text-xs" />
                <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} className="text-xs" />
                <Tooltip formatter={(v: number) => formatLEK(v)} />
                <Bar dataKey="amount" fill="hsl(220 70% 25%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KPI({ icon, label, value, sub, danger }: { icon: React.ReactNode; label: string; value: string; sub?: string; danger?: boolean }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className={`flex items-center gap-2 text-sm ${danger ? "text-destructive" : "text-muted-foreground"}`}>
          {icon} {label}
        </div>
        <div className={`mt-2 text-2xl font-semibold tracking-tight ${danger ? "text-destructive" : "text-foreground"}`}>{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
      </CardContent>
    </Card>
  );
}