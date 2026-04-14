import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Globe,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  ChevronRight,
  Sparkles,
  Mail,
  Phone,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Fourspring Consort — Build, Command, Elevate" },
      {
        name: "description",
        content:
          "Fourspring Consort delivers enterprise-grade digital products — from business intelligence dashboards to workforce platforms and premium web experiences.",
      },
      { property: "og:title", content: "Fourspring Consort — Build, Command, Elevate" },
      {
        property: "og:description",
        content:
          "Enterprise-grade digital products for modern businesses. Command your operations, find talent, and elevate your presence.",
      },
    ],
  }),
});

const products = [
  {
    slug: "business-command-dashboard",
    name: "Business Command Dashboard",
    description:
      "Centralized command center for business intelligence, reporting, and executive decision-making.",
    icon: LayoutDashboard,
    gradient: "from-[oklch(0.55_0.2_250)] to-[oklch(0.45_0.22_270)]",
    tag: "Intelligence",
  },
  {
    slug: "findworkers-nexaworks",
    name: "FindWorkers / NexaWorks",
    description:
      "Talent discovery and workforce management platform connecting businesses with skilled professionals.",
    icon: Users,
    gradient: "from-[oklch(0.55_0.18_160)] to-[oklch(0.45_0.2_140)]",
    tag: "Workforce",
  },
  {
    slug: "fourspring-elevate-website",
    name: "Fourspring Elevate Website",
    description:
      "Premium website builder and digital presence platform for modern businesses.",
    icon: Globe,
    gradient: "from-[oklch(0.6_0.2_30)] to-[oklch(0.5_0.22_15)]",
    tag: "Digital Presence",
  },
];

const capabilities = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed — every interaction feels instant.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security protects every piece of your data.",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description: "Turn raw data into actionable intelligence effortlessly.",
  },
  {
    icon: Sparkles,
    title: "Modern Experience",
    description: "Interfaces so refined they feel like they read your mind.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const navLinks = [
  { href: "#products", label: "Products" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
];

function scrollTo(hash: string) {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollTo(href);
  };

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">FC</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Fourspring Consort
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin/login" className="hidden md:block">
              <Button variant="outline" size="sm" className="gap-1.5">
                Admin <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  to="/admin/login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
                >
                  Admin Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-hero-gradient-from to-hero-gradient-to" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.5_0.15_250/0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[oklch(1_0_0/0.15)] bg-[oklch(1_0_0/0.08)] px-4 py-1.5 text-sm text-[oklch(0.85_0.03_250)]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Enterprise Digital Products
            </motion.div>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-[oklch(0.98_0.005_250)] sm:text-5xl lg:text-6xl"
            >
              Build. Command.{" "}
              <span className="bg-gradient-to-r from-hero-accent to-[oklch(0.75_0.15_200)] bg-clip-text text-transparent">
                Elevate.
              </span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-[oklch(0.7_0.02_250)]"
            >
              Fourspring Consort delivers enterprise-grade digital products —
              from business intelligence dashboards to workforce platforms and
              premium web experiences.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <a href="#products" onClick={(e) => handleNavClick(e, "#products")}>
                <Button size="lg" className="gap-2 bg-hero-accent text-[oklch(0.98_0_0)] hover:bg-[oklch(0.65_0.18_250)]">
                  Explore Products <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[oklch(1_0_0/0.2)] bg-transparent text-[oklch(0.85_0.03_250)] hover:bg-[oklch(1_0_0/0.08)]"
                >
                  Get in Touch
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-20 py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.p custom={0} variants={fadeUp} className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Our Products
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Solutions That Scale With You
            </motion.h2>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {products.map((product, i) => (
              <Link
                key={product.slug}
                to="/products/$slug"
                params={{ slug: product.slug }}
                className="block"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={i}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-xl cursor-pointer"
                >
                  <div
                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${product.gradient}`}
                  >
                    <product.icon className="h-6 w-6 text-[oklch(0.98_0_0)]" />
                  </div>
                  <span className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {product.tag}
                  </span>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-6 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="scroll-mt-20 border-t border-border bg-secondary/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.p custom={0} variants={fadeUp} className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Why Fourspring Consort
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for the Enterprise
            </motion.h2>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <cap.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{cap.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="scroll-mt-20 border-t border-border py-24 bg-background">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 custom={0} variants={fadeUp} className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Let's discuss how Fourspring Consort can power your next phase of growth.
            </motion.p>
            <motion.div custom={2} variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                hello@fourspringconsort.com
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +234 801 234 5678
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <span className="text-[10px] font-bold text-primary-foreground">FC</span>
            </div>
            <span className="text-sm font-medium">Fourspring Consort</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Fourspring Consort. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
