"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md content-center px-4 py-12">
      <div className="rounded-lg border p-6 shadow-sm">
        <h1 className="text-2xl font-black">Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Access your customer account or ERP dashboard.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            setLoading(true);
            try {
              const result = await apiFetch<{ token: string; user: { role: string } }>("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email: form.get("email"), password: form.get("password") })
              });
              localStorage.setItem("tyrepro_token", result.token);
              document.cookie = `tyrepro_token=${result.token}; path=/; max-age=604800; SameSite=Lax`;
              toast.success("Logged in successfully");
              router.push(result.user.role === "CUSTOMER" ? "/" : "/admin");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Login failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Button className="w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <Link href="/forgot-password">Forgot password?</Link>
          <Link href="/register">Create account</Link>
        </div>
      </div>
    </main>
  );
}
