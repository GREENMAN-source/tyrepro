"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md content-center px-4 py-12">
      <div className="rounded-lg border p-6 shadow-sm">
        <h1 className="text-2xl font-black">Register</h1>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            setLoading(true);
            try {
              const result = await apiFetch<{ token: string }>("/auth/register", {
                method: "POST",
                body: JSON.stringify({
                  name: form.get("name"),
                  email: form.get("email"),
                  phone: form.get("phone"),
                  password: form.get("password")
                })
              });
              localStorage.setItem("tyrepro_token", result.token);
              document.cookie = `tyrepro_token=${result.token}; path=/; max-age=604800; SameSite=Lax`;
              toast.success("Account created");
              router.push("/");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Registration failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          <Input name="name" placeholder="Name" required />
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="phone" placeholder="Phone" required />
          <Input name="password" type="password" placeholder="Password" required minLength={8} />
          <Button className="w-full" disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
        </form>
      </div>
    </main>
  );
}
