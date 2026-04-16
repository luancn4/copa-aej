"use client";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="rounded-full bg-white text-black px-4 py-2 mb-4 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
    >
      Logout
    </button>
  );
};
