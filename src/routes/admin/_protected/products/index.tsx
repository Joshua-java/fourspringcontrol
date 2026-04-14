import { createFileRoute, Link } from "@tanstack/react-router";
import { DEFAULT_PRODUCTS } from "@/lib/admin-constants";
import { LayoutDashboard, Users, Globe, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/_protected/products/")({
  component: Products,
  head: () => ({
    meta: [{ title: "Products — Fourspring Consort Admin" }],
  }),
});

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
};

function Products() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Products</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your Fourspring Consort product portfolio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEFAULT_PRODUCTS.map((product) => (
          <Link
            key={product.slug}
            to="/admin/products/$slug"
            params={{ slug: product.slug }}
            className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-admin-brand/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-admin-brand" style={{ background: `${product.color}20` }}>
                {iconMap[product.icon]}
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-admin-brand transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mt-4">{product.name}</h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
            <div className="flex gap-4 mt-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">—</p>
                <p className="text-[10px] text-muted-foreground">Media</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">—</p>
                <p className="text-[10px] text-muted-foreground">Leads</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">—</p>
                <p className="text-[10px] text-muted-foreground">Visits</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
