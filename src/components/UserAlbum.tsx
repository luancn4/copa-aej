import Image from "next/image";
import Link from "next/link";
import type { AlbumSummary } from "@/lib/catalog";

interface UserAlbumProps {
  album: AlbumSummary;
}

export const UserAlbum = ({ album }: UserAlbumProps) => {
  return (
    <Link
      href={`/albums/${album.albumId}`}
      className="card-surface flex min-h-22 flex-col gap-4 p-4 transition hover:border-[#1E3A5F]/25 hover:shadow-[0_8px_24px_rgba(15,42,68,0.08)] lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          {album.ownerImage ? (
            <Image
              src={album.ownerImage}
              alt={album.ownerName}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DCE5EF] text-base font-semibold text-[#0F2A44]">
              {album.ownerName.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className="text-base font-semibold text-[#0F2A44]">
            {album.ownerName}
          </p>
          <p className="text-sm text-[#6B7280]">{album.name}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 sm:gap-8">
        <div className="min-w-18">
          <p className="text-xs font-medium text-[#9CA3AF]">Faltando</p>
          <p className="text-lg font-bold text-[#EB5757]">
            {album.missingCount}
          </p>
        </div>
        <div className="min-w-18">
          <p className="text-xs font-medium text-[#9CA3AF]">Repetidas</p>
          <p className="text-lg font-bold text-[#F2994A]">
            {album.duplicateCount}
          </p>
        </div>
        <div className="min-w-18">
          <p className="text-xs font-medium text-[#9CA3AF]">Já tenho</p>
          <p className="text-lg font-bold text-[#27AE60]">
            {album.ownedUnique}
          </p>
        </div>
      </div>
    </Link>
  );
};
