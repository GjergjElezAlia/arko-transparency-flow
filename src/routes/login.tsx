import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/arko/SiteLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, Lock } from "lucide-react";
import { login } from "@/lib/arko-auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Auditor Login — ARKO" }] }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("auditor@kls.gov.al");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate({ to: "/auditor/overview" });
    } else {
      setError("Kredenciale të pavlefshme.");
    }
  };

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle>Portal i Audituesve Qeveritarë</CardTitle>
            <CardDescription>Qasja është e kufizuar për personel të autorizuar.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
              <div className="space-y-2">
                <Label htmlFor="email">Email institucional</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Fjalëkalimi</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full"><Lock className="mr-2 h-4 w-4" /> Hyr në Portal</Button>
              <p className="text-xs text-center text-muted-foreground pt-2">
                Demo: çdo email + fjalëkalim 4+ karaktere funksionon.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}