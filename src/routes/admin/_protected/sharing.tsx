import { createFileRoute } from "@tanstack/react-router";
import { Share2, Copy, ExternalLink, Link as LinkIcon, FileText, Film } from "lucide-react";

export const Route = createFileRoute("/admin/_protected/sharing")({
  component: Sharing,
  head: () => ({ meta: [{ title: "Share & Publish — Fourspring Consort Admin" }] }),
});

function Sharing() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Share & Publish</h2>
        <p className="text-sm text-muted-foreground mt-1">Prepare and distribute content across channels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Share Product Pages", desc: "Generate shareable links for product landing pages.", icon: <LinkIcon className="w-6 h-6" /> },
          { title: "Share Demo Videos", desc: "Create embeddable or social-ready video links.", icon: <Film className="w-6 h-6" /> },
          { title: "Export Reports", desc: "Download analytics reports as PDF or CSV.", icon: <FileText className="w-6 h-6" /> },
        ].map((item) => (
          <div key={item.title} className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-admin-brand/10 flex items-center justify-center text-admin-brand">
              {item.icon}
            </div>
            <h3 className="font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
            <button className="w-full py-2.5 bg-admin-brand text-admin-brand-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Coming Soon
            </button>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-foreground">Quick Share Links</h3>
        <p className="text-sm text-muted-foreground">Generate shareable URLs for your Fourspring Consort products</p>
        <div className="space-y-3">
          {[
            { name: "Business Command Dashboard", url: "https://fourspringconsort.com/products/business-command" },
            { name: "FindWorkers / NexaWorks", url: "https://fourspringconsort.com/products/findworkers" },
            { name: "Fourspring Elevate Website", url: "https://fourspringconsort.com/products/elevate" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-3 p-3 bg-admin-surface rounded-lg">
              <span className="text-sm text-foreground flex-1">{item.name}</span>
              <code className="text-xs text-muted-foreground hidden lg:block truncate max-w-[300px]">{item.url}</code>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
