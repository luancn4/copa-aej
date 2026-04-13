import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans bg-white">
      <main className="flex flex-col items-center justify-center w-full text-center">
        <h1 className="text-black mb-4">COPA AEJ</h1>
        <Link
          href="/albums"
          className="rounded-full bg-white text-black px-4 py-2 mb-4 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
        >
          Login (Ir para tela principal)
        </Link>
      </main>
    </div>
  );
}
