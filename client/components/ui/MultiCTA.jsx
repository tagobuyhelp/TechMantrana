"use client";

import Image from "next/image";

export default function MultiCTA({
  whatsappHref = "https://wa.me/919903142550",
}) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={[
        "fixed bottom-6 right-6 z-50 inline-flex h-12 w-14 md:h-14 md:w-14 items-center justify-center ",
        "overflow-hidden bg-transparent shadow-[0_18px_50px_rgba(0,0,0,0.4)]",
        "transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(0,0,0,0.48)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60 active:translate-y-px",
      ].join(" ")}
    >
      <Image
        src="/images/icons/icons8-whatsapp-48.png"
        alt="WhatsApp"
        width={56}
        height={56}
        unoptimized
        className="h-14 w-14"
      />
    </a>
  );
}
