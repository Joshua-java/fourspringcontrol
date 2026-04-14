import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useState } from "react";
import { DEFAULT_PRODUCTS } from "@/lib/admin-constants";

export const Route = createFileRoute("/admin/_protected/analytics")({
  component: Analytics,
  head: () => ({ meta: [{ title: "Analytics — Fourspring Consort Admin" }] }),
});

const weeklyData = [
  { day: "Mon", visits: 420, clicks: 120, signups: 18, demos: 8 },
  { day: "Tue", visits: 580, clicks: 180, signups: 24, demos: 12 },
  { day: "Wed", visits: 510, clicks: 150, signups: 20, demos: 10 },
  { day: "Thu", visits: 680, clicks: 220, signups: 32, demos: 15 },
  { day: "Fri", visits: 720, clicks: 280, signups: 38, demos: 20 },
  { day: "Sat", visits: 390, clicks: 110, signups: 14, demos: 6 },
  { day: "Sun", visits: 340, clicks: 90, signups: 10, demos: 4 },
];

const events = [
  { type: "visit", text: "Page visited: FindWorkers landing", time: "2 min ago" },
  { type: "click", text: "CTA click: Business Command 'Get Started'", time: "5 min ago" },
  { type: "signup", text: "New signup: user@example.com", time: "12 min ago" },
  { type: "demo", text: "Demo video played: Elevate walkthrough", time: "18 min ago" },
  { type: "chat", text: "Chat started: pricing inquiry", time: "25 min ago" },
  { type: "click", text: "CTA click: FindWorkers 'Post a Job'", time: "30 min ago" },
];

function Analytics() {
  const [period, setPeriod] = useState("7d");
  const [product, setProduct] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
          <p className="text-sm text-muted-foreground mt-1">Track performance across all Fourspring Consort products</p>
        </div>
        <div className="flex gap-2">
          {["24h", "7d", "30d", "90d"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                period === p ? "bg-admin-brand text-admin-brand-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="px-3 py-1.5 bg-background border border-input rounded-lg text-xs text-foreground"
          >
            <option value="all">All Products</option>
            {DEFAULT_PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Visits & Clicks</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="visits" fill="var(--admin-stat-blue)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="clicks" fill="var(--admin-stat-amber)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Signups & Demo Plays</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="signups" stroke="var(--admin-stat-green)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="demos" stroke="var(--admin-stat-rose)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Event Activity Feed</h3>
        <div className="divide-y divide-border">
          {events.map((e, i) => (
            <div key={i} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${
                  e.type === "visit" ? "bg-admin-stat-blue" :
                  e.type === "click" ? "bg-admin-stat-amber" :
                  e.type === "signup" ? "bg-admin-stat-green" : "bg-admin-stat-rose"
                }`} />
                <span className="text-sm text-foreground">{e.text}</span>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{e.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
