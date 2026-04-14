import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/admin/reset-password")({
  component: ResetPassword,
  head: () => ({
    meta: [{ title: "Reset Password — Fourspring Consort Admin" }],
  }),
});

function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-admin-brand flex items-center justify-center mx-auto">
          <Zap className="w-7 h-7 text-admin-brand-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Set New Password</h1>
        <p className="text-sm text-muted-foreground">
          This feature is coming soon. Please contact Fourspring Consort support for assistance.
        </p>
        <Link to="/admin/login" className="inline-block text-sm text-admin-brand font-medium hover:underline">
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
}
