import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Mail, Phone, Calendar } from "lucide-react";

export const Route = createFileRoute("/admin/_protected/leads")({
  component: Leads,
  head: () => ({ meta: [{ title: "Leads & Signups — Fourspring Consort Admin" }] }),
});

const mockLeads = [
  { id: "1", name: "Adebayo Ogun", email: "adebayo@email.com", phone: "08012345678", product: "FindWorkers", source: "CTA Click", status: "New", date: "2024-01-15" },
  { id: "2", name: "Chioma Nwafor", email: "chioma@email.com", phone: "08098765432", product: "Business Command", source: "Demo Request", status: "Contacted", date: "2024-01-14" },
  { id: "3", name: "Emeka Eze", email: "emeka@email.com", phone: "08055544433", product: "Elevate Website", source: "Signup", status: "Qualified", date: "2024-01-13" },
  { id: "4", name: "Fatima Bello", email: "fatima@email.com", phone: "08011122233", product: "FindWorkers", source: "CTA Click", status: "New", date: "2024-01-12" },
  { id: "5", name: "Grace Okafor", email: "grace@email.com", phone: "08077788899", product: "Business Command", source: "Signup", status: "Converted", date: "2024-01-11" },
];

function Leads() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Leads & Signups</h2>
        <p className="text-sm text-muted-foreground mt-1">Track and manage all incoming leads across products</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-admin-brand/30"
          />
        </div>
        <select className="px-3 py-2.5 bg-background border border-input rounded-lg text-sm text-foreground">
          <option>All Products</option>
          <option>FindWorkers</option>
          <option>Business Command</option>
          <option>Elevate Website</option>
        </select>
        <select className="px-3 py-2.5 bg-background border border-input rounded-lg text-sm text-foreground">
          <option>All Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Converted</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Contact</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Source</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-admin-surface transition-colors">
                  <td className="p-4 font-medium text-foreground">{lead.name}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{lead.product}</td>
                  <td className="p-4 text-muted-foreground">{lead.source}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      lead.status === "New" ? "bg-admin-stat-blue/10 text-admin-stat-blue" :
                      lead.status === "Contacted" ? "bg-admin-stat-amber/10 text-admin-stat-amber" :
                      lead.status === "Qualified" ? "bg-admin-stat-green/10 text-admin-stat-green" :
                      "bg-primary/10 text-primary"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{lead.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
