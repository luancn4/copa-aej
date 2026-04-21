import { DEFAULT_ALBUM_NAME, DEFAULT_ALBUM_SLUG, TOTAL_STICKERS, type AlbumDetail, type AlbumStickerItem, type AlbumSummary } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

type AlbumRecord = {
  id: string;
  slug: string;
  name: string;
  userId: string;
  user: {
    name: string;
    image: string | null;
  };
};

function buildSummary(
  album: AlbumRecord,
  stickerRows: Array<{ quantity: number }>,
): AlbumSummary {
  const ownedUnique = stickerRows.length;
  const duplicateCount = stickerRows.reduce(
    (total, stickerRow) => total + Math.max(stickerRow.quantity - 1, 0),
    0,
  );

  return {
    id: album.id,
    slug: album.slug,
    albumId: album.id,
    name: album.name,
    ownerId: album.userId,
    ownerName: album.user.name,
    ownerImage: album.user.image,
    totalStickers: TOTAL_STICKERS,
    ownedUnique,
    missingCount: TOTAL_STICKERS - ownedUnique,
    duplicateCount,
  };
}

export async function getOrCreateDefaultAlbum(userId: string) {
  return prisma.album.upsert({
    where: {
      userId,
    },
    update: {
      slug: DEFAULT_ALBUM_SLUG,
      name: DEFAULT_ALBUM_NAME,
    },
    create: {
      userId,
      slug: DEFAULT_ALBUM_SLUG,
      name: DEFAULT_ALBUM_NAME,
    },
  });
}

export async function getAlbumSummaryForUser(userId: string): Promise<AlbumSummary> {
  const album = await getOrCreateDefaultAlbum(userId);
  const albumWithUser = await prisma.album.findUnique({
    where: {
      id: album.id,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      userId: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  const stickerRows = await prisma.albumSticker.findMany({
    where: {
      albumId: album.id,
      quantity: {
        gt: 0,
      },
    },
    select: {
      quantity: true,
    },
  });

  if (!albumWithUser) {
    throw new Error("Album not found.");
  }

  return buildSummary(albumWithUser, stickerRows);
}

export async function getAllAlbumSummaries(): Promise<AlbumSummary[]> {
  const albums = await prisma.album.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      userId: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      stickers: {
        where: {
          quantity: {
            gt: 0,
          },
        },
        select: {
          quantity: true,
        },
      },
    },
    orderBy: {
      user: {
        name: "asc",
      },
    },
  });

  return albums.map((album) => buildSummary(album, album.stickers));
}

export async function getAlbumStickers(albumId: string): Promise<AlbumStickerItem[]> {
  const [stickers, albumStickers] = await Promise.all([
    prisma.sticker.findMany({
      orderBy: {
        sequence: "asc",
      },
    }),
    prisma.albumSticker.findMany({
      where: {
        albumId,
        quantity: {
          gt: 0,
        },
      },
      select: {
        stickerId: true,
        quantity: true,
      },
    }),
  ]);

  const quantities = new Map(
    albumStickers.map((albumSticker) => [albumSticker.stickerId, albumSticker.quantity]),
  );

  return stickers.map((sticker) => ({
    id: sticker.id,
    code: sticker.code,
    label: sticker.label,
    category: sticker.category,
    selectionName: sticker.selectionName,
    quantity: quantities.get(sticker.id) ?? 0,
  }));
}

export async function getAlbumDetailForUser(
  viewerId: string,
  albumId: string,
): Promise<AlbumDetail | null> {
  const album = await prisma.album.findUnique({
    where: {
      id: albumId,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      userId: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!album) {
    return null;
  }

  const [stickers, stickerRows] = await Promise.all([
    getAlbumStickers(album.id),
    prisma.albumSticker.findMany({
      where: {
        albumId: album.id,
        quantity: {
          gt: 0,
        },
      },
      select: {
        quantity: true,
      },
    }),
  ]);

  return {
    ...buildSummary(album, stickerRows),
    isOwner: album.userId === viewerId,
    stickers,
  };
}

export async function setAlbumStickerQuantity({
  albumId,
  stickerId,
  quantity,
}: {
  albumId: string;
  stickerId: number;
  quantity: number;
}) {
  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new Error("Quantity must be a non-negative integer.");
  }

  const sticker = await prisma.sticker.findUnique({
    where: {
      id: stickerId,
    },
    select: {
      id: true,
    },
  });

  if (!sticker) {
    throw new Error("Sticker not found.");
  }

  if (quantity === 0) {
    await prisma.albumSticker.deleteMany({
      where: {
        albumId,
        stickerId,
      },
    });
  } else {
    await prisma.albumSticker.upsert({
      where: {
        albumId_stickerId: {
          albumId,
          stickerId,
        },
      },
      update: {
        quantity,
      },
      create: {
        albumId,
        stickerId,
        quantity,
      },
    });
  }

  return {
    stickerId,
    quantity,
  };
}
