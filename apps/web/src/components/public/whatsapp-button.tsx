import { MessageCircle } from "lucide-react";

export function WhatsappButton() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-glass transition hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
