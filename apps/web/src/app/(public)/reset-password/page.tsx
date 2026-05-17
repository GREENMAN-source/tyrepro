import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md content-center px-4 py-12">
      <div className="rounded-lg border p-6 shadow-sm">
        <h1 className="text-2xl font-black">Choose a new password</h1>
        <form className="mt-6 space-y-4">
          <Input type="password" placeholder="New password" />
          <Input type="password" placeholder="Confirm password" />
          <Button className="w-full">Update password</Button>
        </form>
      </div>
    </main>
  );
}
