import type { ReactNode } from "react";
import { Footer } from "@/components/public/footer";
import { PublicNavbar } from "@/components/public/navbar";
import { WhatsappButton } from "@/components/public/whatsapp-button";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicNavbar />
      {children}
      <Footer />
      <WhatsappButton />
    </>
  );
}
