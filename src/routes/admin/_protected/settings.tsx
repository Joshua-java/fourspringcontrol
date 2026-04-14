import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { User, Bell, Shield, Palette, Globe, Database } from "lucide-react";

export const Route = createFileRoute("/admin/_protected/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings — Fourspring Consort Admin" }] }),
});

function SettingsPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your Fourspring Consort admin preferences</p>
      </div>

      <div className="space-y-4">
        {[
          {
            icon: <User className="w-5 h-5" />,
            title: "Profile",
            desc: `Signed in as ${(user?.username as string) || "Admin"}`,
            action: "Edit Profile",
          },
          {
            icon: <Bell className="w-5 h-5" />,
            title: "Notifications",
            desc: "Configure email and push notification preferences",
            action: "Configure",
          },
          {
            icon: <Shield className="w-5 h-5" />,
            title: "Security",
            desc: "Password, two-factor authentication, and session management",
            action: "Manage",
          },
          {
            icon: <Palette className="w-5 h-5" />,
            title: "Appearance",
            desc: "Theme, layout, and display preferences",
            action: "Customize",
          },
          {
            icon: <Globe className="w-5 h-5" />,
            title: "API & Integrations",
            desc: "Manage API keys and third-party service connections",
            action: "View",
          },
          {
            icon: <Database className="w-5 h-5" />,
            title: "Data Management",
            desc: "Export data, manage storage, and backup settings",
            action: "Manage",
          },
        ].map((item) => (
          <div key={item.title} className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-admin-brand/10 flex items-center justify-center text-admin-brand">
                {item.icon}
              </div>
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-admin-brand border border-admin-brand/30 rounded-lg hover:bg-admin-brand/5 transition-colors">
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
