import { Link, useRouterState } from "@tanstack/react-router";
import { Landmark, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/transparency", label: "Transparency Dashboard" },
  { to: "/about", label: "About Us" },
  { to: "/login", label: "Auditor Login" },
];

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-primary text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded bg-primary-foreground/10 flex items-center justify-center border border-primary-foreground/20">
              <Landmark className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-wide">ARKO</div>
              <div className="text-[10px] uppercase opacity-70">Arka e Rrjedhës Kombëtare</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors",
                    active ? "bg-primary-foreground/15" : "hover:bg-primary-foreground/10",
                    n.label === "Auditor Login" && "ml-2 border border-primary-foreground/30",
                  )}
                >
                  {n.label === "Auditor Login" ? (
                    <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" />{n.label}</span>
                  ) : n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-muted/40 mt-12">
        <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-4 text-sm">
          <div>
            <div className="font-semibold text-foreground mb-2">ARKO</div>
            <p className="text-muted-foreground">
              Platforma kombëtare për transparencën e financave publike të Republikës së Shqipërisë.
            </p>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-2">Lidhje Zyrtare</div>
            <ul className="space-y-1 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Ministria e Financave</a></li>
              <li><a href="#" className="hover:text-primary">Kontrolli i Lartë i Shtetit</a></li>
              <li><a href="#" className="hover:text-primary">Agjencia e Prokurimit Publik</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-2">Burime</div>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link to="/transparency" className="hover:text-primary">Të dhëna të hapura</Link></li>
              <li><Link to="/about" className="hover:text-primary">Rreth ARKO</Link></li>
              <li><a href="#" className="hover:text-primary">Politika e Privatësisë</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-2">Pajtueshmëri Ligjore</div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Në përputhje me Ligjin Nr. 9887 "Për Mbrojtjen e të Dhënave Personale" të Republikës së Shqipërisë.
              Të gjitha të dhënat individuale janë të anonimizuara.
            </p>
          </div>
        </div>
        <div className="border-t">
          <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground flex flex-col md:flex-row md:justify-between gap-2">
            <span>© {new Date().getFullYear()} Republika e Shqipërisë — ARKO. Të gjitha të drejtat të rezervuara.</span>
            <span>Versioni Demo 1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}