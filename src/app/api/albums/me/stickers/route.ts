import { auth } from "@/lib/auth";
import { getAlbumStickers, getOrCreateDefaultAlbum } from "@/lib/albums";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const album = await getOrCreateDefaultAlbum(session.user.id);
  const stickers = await getAlbumStickers(album.id);

  return Response.json(stickers);
}
