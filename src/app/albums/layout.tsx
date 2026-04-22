import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AppHeader } from "@/components/AppHeader";

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
    <div className="flex flex-1 flex-col bg-[#F5F7FA] text-[#0F2A44]">
      <AppHeader session={session} />
      <main className="page-shell flex flex-1 flex-col">{children}</main>
    </div>
  );
}
