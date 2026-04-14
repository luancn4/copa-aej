"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Albums() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-red-200 text-black w-full">
      <p>Você está na página de álbuns!</p>
      <button
        onClick={() => signOut()}
        className="rounded-full bg-white text-black px-4 py-2 mb-4 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
      >
        Logout
      </button>
      <div className="grid grid-cols-1 gap-4 max-w-3xl">
        <div className="flex flex-col bg-white rounded-xl p-4 shadow-md items-center">
          <p>Album 1</p>
          <Link
            href="/albums/1"
            className="rounded-full bg-[#211b15] text-white px-4 py-2 hover:bg-gray-300 hover:text-black cursor-pointer"
          >
            Ver
          </Link>
        </div>
        <div className="flex flex-col bg-white rounded-xl p-4 shadow-md items-center">
          <p>Album 2</p>
          <Link
            href="/albums/2"
            className="rounded-full bg-[#211b15] text-white px-4 py-2 hover:bg-gray-300 hover:text-black cursor-pointer"
          >
            Ver
          </Link>
        </div>
        <div className="flex flex-col bg-white rounded-xl p-4 shadow-md items-center">
          <p>Album 3</p>
          <Link
            href="/albums/3"
            className="rounded-full bg-[#211b15] text-white px-4 py-2 hover:bg-gray-300 hover:text-black cursor-pointer"
          >
            Ver
          </Link>
        </div>
      </div>
    </div>
  );
}
