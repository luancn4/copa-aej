import { auth } from "@/lib/auth";
import { AlbumClient } from "@/components/AlbumClient";
import { getAlbumDetailForUser } from "@/lib/albums";
import { notFound, redirect } from "next/navigation";
import { GoBackButton } from "@/components/GoBackButton";
import Image from "next/image";

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
    <div className="space-y-8">
      <div className="space-y-6">
        <GoBackButton
          className="text-sm font-medium text-[#6B7280] transition hover:text-[#0F2A44] hover:underline cursor-pointer"
          text="Voltar para os álbuns"
        />
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-5">
            {album.ownerImage ? (
              <Image
                src={album.ownerImage}
                alt={album.ownerName}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover shadow-[0_8px_24px_rgba(15,42,68,0.12)]"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#DCE5EF] text-3xl font-bold text-[#0F2A44] shadow-[0_8px_24px_rgba(15,42,68,0.12)]">
                {album.ownerName.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-[32px] font-bold text-[#0F2A44]">
                {album.ownerName}
              </h2>
              <p className="text-sm text-[#6B7280]">
                Possível edit no perfil aqui, morra jardel
              </p>
            </div>
          </div>
        </div>
      </div>
      <AlbumClient initialAlbum={album} initialStickers={album.stickers} />
    </div>
  );
}
