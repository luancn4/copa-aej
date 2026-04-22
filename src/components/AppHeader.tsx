import Image from "next/image";
import type { Session } from "next-auth";
import { AppLogo } from "@/components/AppLogo";
import { LogoutButton } from "@/components/LogoutButton";

type AppHeaderProps = {
  session: Session;
};

export function AppHeader({ session }: AppHeaderProps) {
  const userName = session.user?.name ?? "Collector";

  return (
    <header className="bg-[#0F2A44] text-white">
      <div className="mx-auto flex h-18 w-full max-w-360 items-center justify-between px-4 sm:px-8">
        <AppLogo compact />
        <div className="flex items-center gap-3">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={userName}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-white/20 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-white">
              {userName.slice(0, 1).toUpperCase()}
            </div>
          )}
          <span className="hidden text-sm text-white/88 sm:block">{userName}</span>
          <LogoutButton text="Sair" />
        </div>
      </div>
    </header>
  );
}
