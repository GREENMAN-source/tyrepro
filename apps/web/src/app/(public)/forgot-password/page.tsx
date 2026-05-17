import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md content-center px-4 py-12">
      <div className="rounded-lg border p-6 shadow-sm">
        <h1 className="text-2xl font-black">Reset password</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter your email to receive a reset link.</p>
        <form className="mt-6 space-y-4">
          <Input type="email" placeholder="Email" />
          <Button className="w-full">Send reset link</Button>
        </form>
      </div>
    </main>
  );
}
