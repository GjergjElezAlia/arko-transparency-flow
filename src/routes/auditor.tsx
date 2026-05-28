import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { LayoutDashboard, ScrollText, AlertTriangle, FileBarChart, LogOut, Landmark } from "lucide-react";
import { getSession, logout } from "@/lib/arko-auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auditor")({
  head: () => ({ meta: [{ title: "Auditor Portal — ARKO" }] }),
  component: Layout,
});

const items = [
  { to: "/auditor/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/auditor/audit-trail", label: "Audit Trail", icon: ScrollText },
  { to: "/auditor/alerts", label: "Anomaly Alerts", icon: AlertTriangle },
  { to: "/auditor/reports", label: "Reports", icon: FileBarChart },
];

function Layout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!getSession()) navigate({ to: "/login" });
    else setReady(true);
  }, [navigate]);

  if (!ready) return null;

  const session = getSession();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <Link to="/auditor/overview" className="flex items-center gap-2 px-2 py-1.5">
              <div className="h-8 w-8 rounded bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center">
                <Landmark className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <div className="font-semibold text-sm">ARKO</div>
                <div className="text-[10px] uppercase opacity-70">Auditor Portal</div>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigimi</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((it) => (
                    <SidebarMenuItem key={it.to}>
                      <SidebarMenuButton asChild isActive={pathname === it.to}>
                        <Link to={it.to} className="flex items-center gap-2">
                          <it.icon className="h-4 w-4" />
                          <span>{it.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-3 text-xs">
            <div className="opacity-80 truncate">{session?.email}</div>
            <Button
              variant="secondary"
              size="sm"
              className="mt-2 w-full"
              onClick={() => { logout(); navigate({ to: "/login" }); }}
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" /> Dilni
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b bg-background flex items-center px-4 gap-3">
            <SidebarTrigger />
            <div className="text-sm text-muted-foreground">Auditor Portal</div>
          </header>
          <main className="flex-1 p-6"><Outlet /></main>
        </div>
      </div>
    </SidebarProvider>
  );
}