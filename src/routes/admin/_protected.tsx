import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/_protected")({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
