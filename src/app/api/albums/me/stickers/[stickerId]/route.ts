import { auth } from "@/lib/auth";
import { getOrCreateDefaultAlbum, setAlbumStickerQuantity } from "@/lib/albums";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ stickerId: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { stickerId } = await params;
  const numericStickerId = Number(stickerId);

  if (!Number.isInteger(numericStickerId) || numericStickerId <= 0) {
    return Response.json({ error: "Invalid sticker id." }, { status: 400 });
  }

  const body = (await request.json()) as { quantity?: unknown };
  const quantity = body.quantity;

  if (!Number.isInteger(quantity) || (quantity as number) < 0) {
    return Response.json(
      { error: "Quantity must be a non-negative integer." },
      { status: 400 },
    );
  }

  try {
    const album = await getOrCreateDefaultAlbum(session.user.id);
    const result = await setAlbumStickerQuantity({
      albumId: album.id,
      stickerId: numericStickerId,
      quantity: quantity as number,
    });

    return Response.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update sticker.";

    return Response.json({ error: message }, { status: 400 });
  }
}
