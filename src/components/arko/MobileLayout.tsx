import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BarChart3, Info, ShieldCheck, Landmark, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/transparency", label: "Data", icon: BarChart3 },
  { to: "/about", label: "About", icon: Info },
  { to: "/login", label: "Auditor", icon: ShieldCheck },
] as const;

export function MobileLayout({
  children,
  title,
  transparentHeader,
}: {
  children: React.ReactNode;
  title?: string;
  transparentHeader?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Top app bar */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-colors",
          transparentHeader
            ? "bg-transparent text-primary-foreground"
            : "bg-background/85 backdrop-blur-xl border-b border-border text-foreground",
        )}
      >
        <div className="px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 tap-scale">
            <div
              className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center",
                transparentHeader
                  ? "bg-white/10 border border-white/20"
                  : "bg-primary text-primary-foreground",
              )}
            >
              <Landmark className="h-4 w-4" />
            </div>
            <div className="leading-none">
              <div className="font-semibold text-sm tracking-wide">ARKO</div>
              <div className="text-[9px] uppercase opacity-70 tracking-widest">
                {title ?? "Republika e Shqipërisë"}
              </div>
            </div>
          </Link>
          <button
            className={cn(
              "h-9 w-9 rounded-full flex items-center justify-center tap-scale",
              transparentHeader
                ? "bg-white/10 border border-white/15"
                : "bg-muted",
            )}
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute mt-[-14px] ml-[14px] h-2 w-2 rounded-full bg-[var(--gold)] animate-[pulse-soft_2.8s_ease-in-out_infinite]" />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-24 animate-[fade-in_0.35s_ease-out]">{children}</main>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 inset-x-0 z-50">
        <div className="mx-3 mb-3 rounded-2xl bg-background/90 backdrop-blur-xl border border-border shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]">
          <ul className="grid grid-cols-4">
            {tabs.map((t) => {
              const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
              const Icon = t.icon;
              return (
                <li key={t.to}>
                  <Link
                    to={t.to}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 py-2.5 tap-scale relative",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {active && (
                      <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary animate-[scale-in_0.3s_ease-out]" />
                    )}
                    <Icon className={cn("h-[18px] w-[18px] transition-transform", active && "scale-110")} />
                    <span className="text-[10px] font-medium">{t.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}