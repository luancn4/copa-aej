"use client";
import { signOut } from "next-auth/react";

export const LogoutButton = ({ text }: { text?: string }) => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full bg-white text-black px-3 py-1 hover:bg-gray-200 cursor-pointer"
    >
      {text || "Logout"}
    </button>
  );
};
