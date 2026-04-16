"use client";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn()}
      className="rounded-full bg-white text-black px-4 py-2 mb-4 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
    >
      Login
    </button>
  );
};
