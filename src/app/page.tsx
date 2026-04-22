import { LoginButton } from "@/components/LoginButton";
import { AppLogo } from "@/components/AppLogo";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/albums");
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-[linear-gradient(135deg,#0F2A44_0%,#1E3A5F_100%)] px-4">
      <main className="flex w-full max-w-xl flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center">
          <AppLogo />
        </div>
        <p className="mt-4 max-w-md text-base text-[#D1D5DB]">
          Escrever em caderninho? Fazer planilha no excel? Notas no celular?
          NEGATIVO! VENHA
        </p>
        <div className="mt-10 flex w-full justify-center">
          <LoginButton />
        </div>
      </main>
    </div>
  );
}
