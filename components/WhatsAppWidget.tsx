"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/+61412007264?text=Hello!"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}
