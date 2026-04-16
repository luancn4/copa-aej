import { LogoutButton } from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Albums() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-red-200 text-black w-full">
      <p>Olá, {session?.user?.name}! Você está na página de álbuns!</p>
      <LogoutButton />
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
