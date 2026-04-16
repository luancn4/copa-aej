import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Album({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="bg-zinc-50 font-sans dark:bg-black min-h-screen flex flex-col items-center justify-center">
      Você está no album: {slug}
    </div>
  );
}
