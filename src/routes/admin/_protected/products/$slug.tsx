import { createFileRoute } from "@tanstack/react-router";
import { DEFAULT_PRODUCTS, type MediaRecord } from "@/lib/admin-constants";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageIcon, Film, Star, MessageSquare, Users, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/admin/_protected/products/$slug")({
  component: ProductWorkspace,
  head: () => ({
    meta: [{ title: "Product Workspace — Fourspring Consort Admin" }],
  }),
});

function ProductWorkspace() {
  const { slug } = Route.useParams();
  const product = DEFAULT_PRODUCTS.find((p) => p.slug === slug);
  const [media, setMedia] = useState<MediaRecord[]>([]);

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold text-foreground">Product not found</h2>
        <p className="text-sm text-muted-foreground mt-2">No product matches "{slug}"</p>
      </div>
    );
  }

  const images = media.filter((m) => m.mediaType === "image");
  const videos = media.filter((m) => m.mediaType === "video");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Images", value: images.length, icon: <ImageIcon className="w-4 h-4" />, color: "text-admin-stat-blue" },
          { label: "Videos", value: videos.length, icon: <Film className="w-4 h-4" />, color: "text-admin-stat-amber" },
          { label: "Leads", value: "—", icon: <Users className="w-4 h-4" />, color: "text-admin-stat-green" },
          { label: "Visits", value: "—", icon: <BarChart3 className="w-4 h-4" />, color: "text-admin-stat-rose" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className={s.color}>{s.icon}</div>
            <div>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="media" className="space-y-4">
        <TabsList>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="demos">Demo Videos</TabsTrigger>
          <TabsTrigger value="chats">Conversations</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="media" className="space-y-4">
          <MediaUploader
            productSlug={slug}
            onUploaded={(record) => setMedia((prev) => [record, ...prev])}
          />
          {media.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((m) => (
                <div key={m.id} className="bg-card border border-border rounded-xl overflow-hidden group">
                  {m.mediaType === "image" ? (
                    <img src={m.fileUrl} alt={m.title} className="w-full h-40 object-cover" />
                  ) : (
                    <video src={m.fileUrl} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground truncate">{m.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{m.mediaType}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {media.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No media uploaded yet for this product.</p>
          )}
        </TabsContent>

        <TabsContent value="demos" className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <Film className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground">Demo Videos</h3>
            <p className="text-sm text-muted-foreground mt-1">Upload and manage demo videos. Mark one as featured for public display.</p>
            {videos.length > 0 ? (
              <div className="mt-6 space-y-3">
                {videos.map((v) => (
                  <div key={v.id} className="flex items-center gap-3 p-3 bg-admin-surface rounded-lg">
                    <Film className="w-5 h-5 text-admin-stat-amber" />
                    <span className="text-sm text-foreground flex-1 text-left truncate">{v.title}</span>
                    <button className="text-xs text-admin-brand hover:underline flex items-center gap-1">
                      <Star className="w-3 h-3" /> Feature
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground mt-4">Upload videos in the Media tab first.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="chats">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground">Conversations</h3>
            <p className="text-sm text-muted-foreground mt-1">Support conversations related to {product.name} will appear here.</p>
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground">Leads & Signups</h3>
            <p className="text-sm text-muted-foreground mt-1">Product-specific leads will appear here when the backend is connected.</p>
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <BarChart3 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground">Product Analytics</h3>
            <p className="text-sm text-muted-foreground mt-1">Detailed analytics for {product.name} will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
