import { Link, useLocation } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import {
  LayoutDashboard, Package, Image, BarChart3, MessageSquare,
  Users, Share2, Settings, LogOut, ChevronLeft, Menu, Zap,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/media", label: "Media Library", icon: Image },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/chats", label: "Chats & Support", icon: MessageSquare },
  { to: "/admin/leads", label: "Leads & Signups", icon: Users },
  { to: "/admin/sharing", label: "Share & Publish", icon: Share2 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 h-full flex flex-col bg-admin-sidebar-bg text-admin-sidebar-text transition-all duration-300 ${
          collapsed ? "w-[68px]" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className={`flex items-center gap-3 px-4 h-16 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-lg bg-admin-brand flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-admin-brand-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">Fourspring Consort</p>
              <p className="text-[10px] text-admin-sidebar-text/60 truncate">Admin Control Center</p>
            </div>
          )}
        </div>

        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-admin-sidebar-active/20 text-white font-medium"
                    : "text-admin-sidebar-text hover:bg-white/5 hover:text-white"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-white/10">
          <button
            onClick={() => {
              logout();
              window.location.href = "/admin/login";
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full text-admin-sidebar-text hover:bg-white/5 hover:text-white transition-all ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center h-8 border-t border-white/10 text-admin-sidebar-text/60 hover:text-white transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top nav */}
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-border bg-background shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-muted">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-foreground hidden md:block">
              {navItems.find((n) => location.pathname.startsWith(n.to))?.label ?? "Admin"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-admin-brand/20 flex items-center justify-center text-xs font-bold text-admin-brand">
              {(user?.username as string)?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
