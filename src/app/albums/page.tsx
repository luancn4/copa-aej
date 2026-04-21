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
        <h2 className="text-2xl font-semibold text-zinc-900">Albuns</h2>
        <p className="text-zinc-600">
          Veja o progresso de todos os colecionadores.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {albums.map((album) => (
          <UserAlbum key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}
