import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/arko/SiteLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { ministryBudget, monthlySpending, transactions, formatLEK } from "@/lib/arko-data";

export const Route = createFileRoute("/transparency")({
  head: () => ({
    meta: [
      { title: "Transparency Dashboard — ARKO" },
      { name: "description", content: "Të dhëna publike mbi buxhetin, kontraktorët dhe shpenzimet e qeverisë shqiptare." },
    ],
  }),
  component: Page,
});

const PIE_COLORS = ["hsl(220 70% 25%)", "hsl(220 50% 40%)", "hsl(210 50% 55%)", "hsl(35 70% 55%)", "hsl(15 65% 50%)", "hsl(160 40% 45%)"];

function Page() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return transactions;
    const s = q.toLowerCase();
    return transactions.filter((t) => t.recipient.toLowerCase().includes(s) || t.nipt.toLowerCase().includes(s));
  }, [q]);

  return (
    <SiteLayout>
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Paneli i Transparencës Publike</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Kërkoni kontraktorë, shfletoni shpërndarjen e buxhetit dhe shqyrtoni transaksionet e fundit të financuara nga taksat publike.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Kërkoni sipas emrit të kompanisë ose NIPT (p.sh. K12345678A)"
                className="pl-9 h-11"
              />
            </div>
            {q && (
              <div className="mt-3 text-sm text-muted-foreground">{filtered.length} rezultate për "{q}"</div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Shpërndarja e Buxhetit sipas Ministrive</CardTitle>
              <CardDescription>Viti fiskal 2026 — në Lekë</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ministryBudget} dataKey="value" nameKey="name" outerRadius={110} label={(e) => e.name}>
                      {ministryBudget.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatLEK(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tendencat e Shpenzimeve</CardTitle>
              <CardDescription>6 muajt e fundit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis tickFormatter={(v) => `${(v / 1_000_000_000).toFixed(0)}Mld`} className="text-xs" />
                    <Tooltip formatter={(v: number) => formatLEK(v)} />
                    <Legend />
                    <Bar dataKey="spending" name="Shpenzime" fill="hsl(220 70% 25%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaksionet e Fundit</CardTitle>
            <CardDescription>Të dhënat individuale janë të anonimizuara në përputhje me Ligjin Nr. 9887.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Marrësi (Kompania)</TableHead>
                    <TableHead className="text-right">Shuma (LEK)</TableHead>
                    <TableHead>Kategoria</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.slice(0, 15).map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                        {new Date(t.date).toLocaleDateString("sq-AL")}
                      </TableCell>
                      <TableCell className="font-medium">{t.recipient}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatLEK(t.amount)}</TableCell>
                      <TableCell><Badge variant="secondary">{t.category}</Badge></TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Asnjë rezultat.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}