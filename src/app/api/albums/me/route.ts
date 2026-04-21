import { auth } from "@/lib/auth";
import { getAlbumSummaryForUser } from "@/lib/albums";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const album = await getAlbumSummaryForUser(session.user.id);

  return Response.json(album);
}
