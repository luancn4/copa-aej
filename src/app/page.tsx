import { LoginButton } from "@/components/LoginButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/albums");
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-white">
      <main className="flex flex-col items-center justify-center w-full text-center">
        <h1 className="text-black mb-4">COPA AEJ</h1>
        <LoginButton />
      </main>
    </div>
  );
}
