import { createFileRoute } from "@tanstack/react-router";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useState } from "react";
import type { MediaRecord } from "@/lib/admin-constants";
import { DEFAULT_PRODUCTS } from "@/lib/admin-constants";
import { Search, Filter, Trash2, Edit, ImageIcon, Film } from "lucide-react";

export const Route = createFileRoute("/admin/_protected/media")({
  component: MediaLibrary,
  head: () => ({ meta: [{ title: "Media Library — Fourspring Consort Admin" }] }),
});

function MediaLibrary() {
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "image" | "video">("all");
  const [productFilter, setProductFilter] = useState("all");

  const filtered = media.filter((m) => {
    if (typeFilter !== "all" && m.mediaType !== typeFilter) return false;
    if (productFilter !== "all" && m.productSlug !== productFilter) return false;
    if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Media Library</h2>
        <p className="text-sm text-muted-foreground mt-1">Upload, manage, and organize all media assets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MediaUploader onUploaded={(r) => setMedia((prev) => [r, ...prev])} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search media..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-admin-brand/30"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as "all" | "image" | "video")}
              className="px-3 py-2.5 bg-background border border-input rounded-lg text-sm text-foreground"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="px-3 py-2.5 bg-background border border-input rounded-lg text-sm text-foreground"
            >
              <option value="all">All Products</option>
              {DEFAULT_PRODUCTS.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((m) => (
                <div key={m.id} className="bg-card border border-border rounded-xl overflow-hidden group relative">
                  {m.mediaType === "image" ? (
                    <img src={m.fileUrl} alt={m.title} className="w-full h-36 object-cover" />
                  ) : (
                    <div className="relative">
                      <video src={m.fileUrl} className="w-full h-36 object-cover" />
                      <Film className="absolute top-2 right-2 w-5 h-5 text-white drop-shadow-md" />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground truncate">{m.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{m.mediaType}</p>
                  </div>
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 flex gap-1.5 transition-opacity">
                    <button className="w-7 h-7 bg-background/90 rounded-md flex items-center justify-center hover:bg-background">
                      <Edit className="w-3.5 h-3.5 text-foreground" />
                    </button>
                    <button className="w-7 h-7 bg-background/90 rounded-md flex items-center justify-center hover:bg-destructive/20">
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                {media.length === 0 ? "No media uploaded yet. Use the uploader to get started." : "No media matches your filters."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
