import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileLayout } from "@/components/arko/MobileLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
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
    if (login(email, password)) navigate({ to: "/auditor/overview" });
    else setError("Kredenciale të pavlefshme.");
  };

  return (
    <MobileLayout transparentHeader title="Auditor">
      <section className="relative -mt-14 pt-14 text-primary-foreground overflow-hidden min-h-[40vh]">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute -top-16 -right-12 h-56 w-56 rounded-full bg-[var(--gold)]/15 blur-3xl -z-10" />
        <div className="px-5 pt-10 pb-12 animate-[fade-up_0.5s_ease-out]">
          <div className="h-12 w-12 rounded-2xl glass-card flex items-center justify-center mb-3">
            <ShieldCheck className="h-5 w-5 text-[var(--gold)]" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Portal i Audituesve</h1>
          <p className="mt-2 text-sm opacity-80">Qasje e kufizuar për personel të autorizuar qeveritar.</p>
        </div>
      </section>

      <section className="px-5 -mt-8 relative z-10">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-premium)] animate-[scale-in_0.4s_ease-out]">
          <form onSubmit={submit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="animate-[fade-up_0.3s_ease-out]">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">Email institucional</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs">Fjalëkalimi</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12 rounded-xl" />
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 tap-scale shadow-[var(--shadow-premium)]"
            >
              <Lock className="h-4 w-4" /> Hyr në Portal <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-[11px] text-center text-muted-foreground pt-1">
              Demo: çdo email + fjalëkalim 4+ karaktere funksionon.
            </p>
          </form>
        </div>
      </section>
    </MobileLayout>
  );
}