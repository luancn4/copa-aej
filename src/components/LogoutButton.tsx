"use client";
import { signOut } from "next-auth/react";

export const LogoutButton = ({ text }: { text?: string }) => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-white/20 px-4 text-sm font-medium text-white transition hover:bg-white/10"
    >
      {text || "Sair"}
    </button>
  );
};
