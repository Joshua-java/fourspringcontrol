import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Users, Globe } from "lucide-react";

export interface ProductInfo {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  gradient: string;
  tag: string;
  features: string[];
}

export const PRODUCT_DATA: Record<string, ProductInfo> = {
  "business-command-dashboard": {
    slug: "business-command-dashboard",
    name: "Business Command Dashboard",
    description:
      "Centralized command center for business intelligence, reporting, and executive decision-making.",
    longDescription:
      "The Business Command Dashboard is an enterprise-grade command center designed for executive teams and operations managers. It consolidates data from multiple sources into a unified, real-time view — enabling faster decisions, clearer reporting, and total operational visibility.",
    icon: LayoutDashboard,
    gradient: "from-[oklch(0.55_0.2_250)] to-[oklch(0.45_0.22_270)]",
    tag: "Intelligence",
    features: [
      "Real-time KPI monitoring",
      "Multi-source data aggregation",
      "Executive-level reporting",
      "Custom dashboard builder",
      "Role-based access control",
      "Automated alerts & notifications",
    ],
  },
  "findworkers-nexaworks": {
    slug: "findworkers-nexaworks",
    name: "FindWorkers / NexaWorks",
    description:
      "Talent discovery and workforce management platform connecting businesses with skilled professionals.",
    longDescription:
      "FindWorkers / NexaWorks is a comprehensive talent discovery and workforce management platform. It helps businesses find, vet, and manage skilled professionals — from sourcing to onboarding and ongoing engagement, all through one powerful interface.",
    icon: Users,
    gradient: "from-[oklch(0.55_0.18_160)] to-[oklch(0.45_0.2_140)]",
    tag: "Workforce",
    features: [
      "Smart talent matching",
      "Automated candidate screening",
      "Workforce analytics dashboard",
      "Scheduling & time tracking",
      "Onboarding workflows",
      "Performance tracking",
    ],
  },
  "fourspring-elevate-website": {
    slug: "fourspring-elevate-website",
    name: "Fourspring Elevate Website",
    description:
      "Premium website builder and digital presence platform for modern businesses.",
    longDescription:
      "Fourspring Elevate is a premium website builder and digital presence platform. It empowers businesses to create stunning, high-performance websites with no-code simplicity — backed by enterprise-grade hosting, SEO tools, and analytics.",
    icon: Globe,
    gradient: "from-[oklch(0.6_0.2_30)] to-[oklch(0.5_0.22_15)]",
    tag: "Digital Presence",
    features: [
      "No-code website builder",
      "Custom domain support",
      "SEO optimization tools",
      "Built-in analytics",
      "Responsive templates",
      "Performance optimization",
    ],
  },
};

export function getProduct(slug: string): ProductInfo | undefined {
  return PRODUCT_DATA[slug];
}

export function getAllProducts(): ProductInfo[] {
  return Object.values(PRODUCT_DATA);
}
