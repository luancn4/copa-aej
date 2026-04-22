"use client";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("discord", { callbackUrl: "/albums" })}
      className="inline-flex h-14 w-full max-w-70 cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#5865F2] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(88,101,242,0.28)] transition hover:-translate-y-px hover:bg-[#4752d4]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
      >
        <path d="M20.3 4.37A16.7 16.7 0 0 0 16.2 3l-.2.4a11.5 11.5 0 0 1 3.3 1.6 12.7 12.7 0 0 0-3.9-1.2 12.4 12.4 0 0 0-6.8 0A12.8 12.8 0 0 0 4.7 5a11.5 11.5 0 0 1 3.3-1.6L7.8 3a16.5 16.5 0 0 0-4.1 1.37C1.1 8.3.4 12.1.7 15.9a16.9 16.9 0 0 0 5 2.5l1.2-1.9c-.7-.3-1.4-.7-2-1.1l.5-.4c3.8 1.8 7.9 1.8 11.7 0l.5.4c-.6.4-1.3.8-2 1.1l1.2 1.9a16.8 16.8 0 0 0 5-2.5c.4-4.3-.7-8.1-3.5-11.53ZM8.9 13.6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm6.2 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
      </svg>
      <span>ENTRAR</span>
    </button>
  );
};
