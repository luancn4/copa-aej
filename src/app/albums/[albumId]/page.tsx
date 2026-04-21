import { auth } from "@/lib/auth";
import { AlbumClient } from "@/components/AlbumClient";
import { getAlbumDetailForUser } from "@/lib/albums";
import { notFound, redirect } from "next/navigation";
import { GoBackButton } from "@/components/GoBackButton";

export default async function Album({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const album = await getAlbumDetailForUser(session.user.id, albumId);

  if (!album) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <GoBackButton className="text-sm tracking-[0.2em] text-zinc-500 hover:underline cursor-pointer" />
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Album
        </p>
        <h2 className="text-3xl font-semibold text-zinc-900">{album.name}</h2>
        <p className="text-zinc-500">Colecionador: {album.ownerName}</p>
        <p className="text-zinc-600">
          {album.ownedUnique} unicas, {album.duplicateCount} repetidas e{" "}
          {album.missingCount} faltando.
        </p>
      </div>
      <AlbumClient initialAlbum={album} initialStickers={album.stickers} />
    </div>
  );
}
