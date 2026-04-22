import { auth } from "@/lib/auth";
import { getAllAlbumSummaries } from "@/lib/albums";
import { redirect } from "next/navigation";
import { UserAlbum } from "@/components/UserAlbum";

export default async function Albums() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const albums = await getAllAlbumSummaries();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-bold text-[#0F2A44]">
          LISTA DE ÁLBUNS
        </h2>
        <p className="mt-2 text-sm text-[#6B7280]">
          SEJA UM PORTEIRO E DÊ SCOUT NO ALBUM DO COLEGUINHA
        </p>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {albums.map((album) => (
          <UserAlbum key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}
