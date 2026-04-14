export const API_BASE_URL = "https://fourspringcontrol.fly.dev";

export const API_ROUTES = {
  auth: {
    register: `${API_BASE_URL}/api/auth/register`,
    login: `${API_BASE_URL}/api/auth/login`,
  },
  uploads: {
    list: `${API_BASE_URL}/api/uploads`,
    create: `${API_BASE_URL}/api/uploads`,
    get: (id: string) => `${API_BASE_URL}/api/uploads/${id}`,
    update: (id: string) => `${API_BASE_URL}/api/uploads/${id}`,
    delete: (id: string) => `${API_BASE_URL}/api/uploads/${id}`,
  },
  products: {
    list: `${API_BASE_URL}/api/products`,
    get: (slug: string) => `${API_BASE_URL}/api/products/${slug}`,
  },
  analytics: {
    overview: `${API_BASE_URL}/api/analytics/overview`,
    byProduct: (slug: string) => `${API_BASE_URL}/api/analytics/${slug}`,
  },
  chats: {
    list: `${API_BASE_URL}/api/chats`,
    get: (id: string) => `${API_BASE_URL}/api/chats/${id}`,
    reply: (id: string) => `${API_BASE_URL}/api/chats/${id}/reply`,
  },
  leads: {
    list: `${API_BASE_URL}/api/leads`,
  },
} as const;

export const CLOUDINARY = {
  cloudName: "dsgahcbvh",
  uploadPreset: "fourspring control",
  imageUploadUrl: "https://api.cloudinary.com/v1_1/dsgahcbvh/image/upload",
  videoUploadUrl: "https://api.cloudinary.com/v1_1/dsgahcbvh/video/upload",
} as const;

export const ADMIN_ROUTES = {
  login: "/admin/login",
  signup: "/admin/signup",
  forgotPassword: "/admin/forgot-password",
  resetPassword: "/admin/reset-password",
  dashboard: "/admin/dashboard",
  products: "/admin/products",
  product: (slug: string) => `/admin/products/${slug}`,
  media: "/admin/media",
  analytics: "/admin/analytics",
  chats: "/admin/chats",
  leads: "/admin/leads",
  sharing: "/admin/sharing",
  settings: "/admin/settings",
} as const;

export interface Product {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const DEFAULT_PRODUCTS: Product[] = [
  {
    slug: "business-command-dashboard",
    name: "Business Command Dashboard",
    description: "Centralized command center for business intelligence, reporting, and executive decision-making.",
    icon: "LayoutDashboard",
    color: "oklch(0.65 0.2 250)",
  },
  {
    slug: "findworkers-nexaworks",
    name: "FindWorkers / NexaWorks",
    description: "Talent discovery and workforce management platform connecting businesses with skilled professionals.",
    icon: "Users",
    color: "oklch(0.65 0.18 160)",
  },
  {
    slug: "fourspring-elevate-website",
    name: "Fourspring Elevate Website",
    description: "Premium website builder and digital presence platform for modern businesses.",
    icon: "Globe",
    color: "oklch(0.65 0.2 30)",
  },
];

export interface MediaRecord {
  id: string;
  title: string;
  description?: string;
  productSlug?: string;
  mediaType: "image" | "video";
  fileUrl: string;
  thumbnailUrl?: string;
  publicId: string;
  contentType?: string;
  isFeatured?: boolean;
  createdAt: string;
}
