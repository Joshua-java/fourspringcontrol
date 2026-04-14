import { createFileRoute } from "@tanstack/react-router";
import { DashboardStatCard } from "@/components/admin/DashboardStatCard";
import {
  Eye, MousePointer, UserPlus, MessageSquare, Image as ImageIcon,
  Film, Package, TrendingUp, BarChart3, Zap, Target, Users,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/admin/_protected/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [{ title: "Dashboard — Fourspring Consort Admin" }],
  }),
});

const chartData = [
  { name: "Mon", visits: 120, signups: 12 },
  { name: "Tue", visits: 180, signups: 18 },
  { name: "Wed", visits: 150, signups: 22 },
  { name: "Thu", visits: 220, signups: 15 },
  { name: "Fri", visits: 280, signups: 30 },
  { name: "Sat", visits: 190, signups: 25 },
  { name: "Sun", visits: 160, signups: 20 },
];

const activityFeed = [
  { text: "New signup from 08099887766", time: "2 min ago" },
  { text: "Video uploaded: Product Demo v2", time: "15 min ago" },
  { text: "New chat from lead: Business Command", time: "1 hr ago" },
  { text: "FindWorkers page view spike detected", time: "3 hrs ago" },
  { text: "New image uploaded to Elevate workspace", time: "5 hrs ago" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Fourspring Consort performance at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStatCard label="Total Visits" value="12,847" icon={<Eye className="w-5 h-5" />} change="+12.3%" color="bg-admin-stat-blue" />
        <DashboardStatCard label="Total Impressions" value="48,291" icon={<BarChart3 className="w-5 h-5" />} change="+8.7%" color="bg-admin-stat-blue" />
        <DashboardStatCard label="Total Clicks" value="3,621" icon={<MousePointer className="w-5 h-5" />} change="+5.2%" color="bg-admin-stat-amber" />
        <DashboardStatCard label="Total Signups" value="842" icon={<UserPlus className="w-5 h-5" />} change="+18.4%" color="bg-admin-stat-green" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStatCard label="Total Leads" value="1,284" icon={<Target className="w-5 h-5" />} color="bg-admin-stat-amber" />
        <DashboardStatCard label="Total Chats" value="328" icon={<MessageSquare className="w-5 h-5" />} color="bg-admin-stat-rose" />
        <DashboardStatCard label="Unread Chats" value="14" icon={<MessageSquare className="w-5 h-5" />} color="bg-admin-stat-rose" />
        <DashboardStatCard label="Uploaded Videos" value="47" icon={<Film className="w-5 h-5" />} color="bg-admin-stat-blue" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStatCard label="Uploaded Images" value="213" icon={<ImageIcon className="w-5 h-5" />} color="bg-admin-stat-blue" />
        <DashboardStatCard label="Active Products" value="3" icon={<Package className="w-5 h-5" />} color="bg-admin-stat-green" />
        <DashboardStatCard label="Conversion Rate" value="6.5%" icon={<TrendingUp className="w-5 h-5" />} change="+0.8%" color="bg-admin-stat-green" />
        <DashboardStatCard label="Top Product" value="FindWorkers" icon={<Zap className="w-5 h-5" />} color="bg-admin-stat-amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Weekly Traffic & Signups</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              />
              <Area type="monotone" dataKey="visits" stroke="var(--admin-stat-blue)" fill="var(--admin-stat-blue)" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="signups" stroke="var(--admin-stat-green)" fill="var(--admin-stat-green)" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-admin-brand mt-2 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Products at a Glance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Business Command Dashboard", visits: "4,230", leads: "428", rate: "7.2%" },
            { name: "FindWorkers / NexaWorks", visits: "5,102", leads: "512", rate: "8.1%" },
            { name: "Fourspring Elevate Website", visits: "3,515", leads: "344", rate: "4.8%" },
          ].map((p) => (
            <div key={p.name} className="p-4 bg-admin-surface rounded-lg border border-border">
              <p className="text-sm font-medium text-foreground">{p.name}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-foreground">{p.visits}</p>
                  <p className="text-[10px] text-muted-foreground">Visits</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{p.leads}</p>
                  <p className="text-[10px] text-muted-foreground">Leads</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{p.rate}</p>
                  <p className="text-[10px] text-muted-foreground">Conv.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
