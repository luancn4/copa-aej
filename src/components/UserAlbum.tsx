import Image from "next/image";
import Link from "next/link";
import type { AlbumSummary } from "@/lib/catalog";

interface UserAlbumProps {
  album: AlbumSummary;
}

export const UserAlbum = ({ album }: UserAlbumProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div>
        <div className="mb-3 flex items-center gap-3">
          {album.ownerImage ? (
            <Image
              src={album.ownerImage}
              alt={album.ownerName}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700">
              {album.ownerName.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-lg font-semibold text-zinc-900">{album.ownerName}</p>
            <p className="text-sm text-zinc-500">{album.name}</p>
          </div>
        </div>
        <p className="text-sm text-zinc-600">
          {album.ownedUnique} de {album.totalStickers} figurinhas unicas
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 text-sm text-zinc-700">
        <div className="rounded-lg bg-zinc-100 p-3">
          <p className="font-medium">{album.missingCount}</p>
          <p>faltando</p>
        </div>
        <div className="rounded-lg bg-zinc-100 p-3">
          <p className="font-medium">{album.ownedUnique}</p>
          <p>obtidas</p>
        </div>
        <div className="rounded-lg bg-zinc-100 p-3">
          <p className="font-medium">{album.duplicateCount}</p>
          <p>repetidas</p>
        </div>
      </div>
      <Link
        href={`/albums/${album.albumId}`}
        className="inline-flex items-center justify-center rounded-full bg-[#211b15] px-4 py-2 text-white hover:bg-zinc-700"
      >
        Ver
      </Link>
    </div>
  );
};
