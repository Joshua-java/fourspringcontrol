import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/admin/forgot-password")({
  component: ForgotPassword,
  head: () => ({
    meta: [{ title: "Forgot Password — Fourspring Consort Admin" }],
  }),
});

function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-admin-brand flex items-center justify-center mx-auto">
          <Zap className="w-7 h-7 text-admin-brand-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Password reset is not yet available. Please contact support to reset your Fourspring Consort admin password.
        </p>
        <Link to="/admin/login" className="inline-block text-sm text-admin-brand font-medium hover:underline">
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
}
