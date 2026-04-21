import Image from "next/image";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";
import { auth } from "@/lib/auth";

export default async function AlbumsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  return (
    <div className="flex flex-1 flex-col bg-green-100 font-sans text-black">
      <header className="flex flex-row items-center justify-between bg-green-400 px-6 py-4 text-white">
        <h1 className="text-xl font-bold text-center">COPA AEJ</h1>
        <div className="flex items-center gap-3">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="Profile image"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : null}
          <span>Ola, {session.user.name}!</span>
          <LogoutButton text="sair" />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-8">
        {children}
      </main>
    </div>
  );
}
