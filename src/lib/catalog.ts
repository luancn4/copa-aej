export const DEFAULT_ALBUM_SLUG = "copa-aej-2026";
export const DEFAULT_ALBUM_NAME = "Copa AEJ 2026";
export const TOTAL_STICKERS = 980;

export type AlbumSummary = {
  id: string;
  slug: string;
  albumId: string;
  name: string;
  ownerId: string;
  ownerName: string;
  ownerImage: string | null;
  totalStickers: number;
  ownedUnique: number;
  missingCount: number;
  duplicateCount: number;
};

export type AlbumStickerItem = {
  id: number;
  code: string;
  label: string;
  category: "TEAM" | "SPECIAL";
  selectionName: string | null;
  quantity: number;
};

export type AlbumDetail = AlbumSummary & {
  isOwner: boolean;
  stickers: AlbumStickerItem[];
};
