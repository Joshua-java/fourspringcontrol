import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/lib/product-data";
import { ProductUploader } from "@/components/ProductUploader";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
  head: ({ params }) => {
    const product = getProduct(params.slug);
    const title = product
      ? `${product.name} — Fourspring Consort`
      : "Product — Fourspring Consort";
    const description = product?.description ?? "Fourspring Consort product page.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
        <p className="mt-2 text-muted-foreground">This product doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Product Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            We couldn't find a product with this identifier.
          </p>
          <Link to="/" className="mt-6 inline-block">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = product.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-6">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="h-5 w-px bg-border" />
          <span className="text-sm font-medium">{product.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-secondary/50 to-background py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
            <div
              className={`inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${product.gradient}`}
            >
              <IconComponent className="h-8 w-8 text-[oklch(0.98_0_0)]" />
            </div>
            <div>
              <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {product.tag}
              </span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
                {product.longDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left: Features */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Key Features</h2>
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Uploads */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Images</h2>
              <ProductUploader productSlug={slug} mediaType="image" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Demo Videos</h2>
              <ProductUploader productSlug={slug} mediaType="video" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <span className="text-[10px] font-bold text-primary-foreground">FC</span>
            </div>
            <span className="text-sm font-medium">Fourspring Consort</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Fourspring Consort
          </p>
        </div>
      </footer>
    </div>
  );
}
