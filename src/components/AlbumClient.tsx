"use client";

import { useMemo, useState } from "react";
import type { AlbumDetail, AlbumStickerItem } from "@/lib/catalog";
import { SummaryStatCard } from "@/components/SummaryStatCard";

type AlbumClientProps = {
  initialAlbum: AlbumDetail;
  initialStickers: AlbumStickerItem[];
};

function buildSummary(stickers: AlbumStickerItem[], totalStickers: number) {
  const ownedUnique = stickers.filter((sticker) => sticker.quantity > 0).length;
  const duplicateCount = stickers.reduce(
    (total, sticker) => total + Math.max(sticker.quantity - 1, 0),
    0,
  );

  return {
    ownedUnique,
    duplicateCount,
    missingCount: totalStickers - ownedUnique,
  };
}

function groupStickers(stickers: AlbumStickerItem[]) {
  const groups = new Map<string, AlbumStickerItem[]>();

  stickers.forEach((sticker) => {
    const key = sticker.selectionName ?? "Especiais";
    const group = groups.get(key) ?? [];
    group.push(sticker);
    groups.set(key, group);
  });

  return Array.from(groups.entries());
}

export function AlbumClient({
  initialAlbum,
  initialStickers,
}: AlbumClientProps) {
  const [stickers, setStickers] = useState(initialStickers);
  const [pendingStickerId, setPendingStickerId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isOwner = initialAlbum.isOwner;

  const summary = useMemo(
    () => buildSummary(stickers, initialAlbum.totalStickers),
    [initialAlbum.totalStickers, stickers],
  );
  const groupedStickers = useMemo(() => groupStickers(stickers), [stickers]);

  async function updateQuantity(stickerId: number, quantity: number) {
    if (!isOwner) {
      return;
    }

    setPendingStickerId(stickerId);
    setError(null);

    try {
      const response = await fetch(`/api/albums/me/stickers/${stickerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(
          payload.error ?? "Nao foi possivel atualizar a figurinha.",
        );
      }

      setStickers((currentStickers) =>
        currentStickers.map((sticker) =>
          sticker.id === stickerId ? { ...sticker, quantity } : sticker,
        ),
      );
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Nao foi possivel atualizar a figurinha.",
      );
    } finally {
      setPendingStickerId(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryStatCard
          label="Faltando"
          value={summary.missingCount}
          color="red"
        />
        <SummaryStatCard
          label="Já tenho"
          value={summary.ownedUnique}
          color="green"
        />
        <SummaryStatCard
          label="Repetidas"
          value={summary.duplicateCount}
          color="orange"
        />
      </div>

      {error ? (
        <p className="rounded-xl border border-[#EB5757]/25 bg-[#FFF3F2] px-4 py-3 text-sm text-[#B24545]">
          {error}
        </p>
      ) : null}

      {!isOwner ? (
        <p className="rounded-xl border border-[#1E3A5F]/15 bg-[#EEF3F8] px-4 py-3 text-sm text-[#1E3A5F]">
          Public view. Only the album owner can change sticker quantities.
        </p>
      ) : null}

      <div className="space-y-8">
        {groupedStickers.map(([groupName, groupStickers]) => (
          <section key={groupName} className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-[#0F2A44]">
                  {groupName}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {
                    groupStickers.filter((sticker) => sticker.quantity > 0)
                      .length
                  }{" "}
                  de {groupStickers.length} tiradas
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {groupStickers.map((sticker) => {
                const isPending = pendingStickerId === sticker.id;
                const hasDuplicates = sticker.quantity > 1;

                return (
                  <article key={sticker.id} className="card-surface p-4">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#9CA3AF]">
                          #{sticker.code}
                        </p>
                        <p className="text-sm font-semibold text-[#0F2A44]">
                          {sticker.label}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          sticker.quantity === 0
                            ? "bg-[#FFF3F2] text-[#EB5757]"
                            : hasDuplicates
                              ? "bg-[#FFF3E8] text-[#F2994A]"
                              : "bg-[#EEF9F2] text-[#27AE60]"
                        }`}
                      >
                        {sticker.quantity === 0
                          ? "faltando"
                          : hasDuplicates
                            ? `${sticker.quantity} repetidas`
                            : "já tenho"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              sticker.id,
                              Math.max(sticker.quantity - 1, 0),
                            )
                          }
                          disabled={
                            !isOwner || isPending || sticker.quantity === 0
                          }
                          className="px-3 py-2 text-lg text-[#0F2A44] disabled:cursor-not-allowed disabled:text-[#CBD5E1]"
                        >
                          -
                        </button>
                        <span className="min-w-10 text-center text-sm font-semibold text-[#0F2A44]">
                          {sticker.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(sticker.id, sticker.quantity + 1)
                          }
                          disabled={!isOwner || isPending}
                          className="px-3 py-2 text-lg text-[#0F2A44] disabled:cursor-not-allowed disabled:text-[#CBD5E1]"
                        >
                          +
                        </button>
                      </div>
                      {isPending ? (
                        <span className="text-xs text-[#9CA3AF]">
                          salvando...
                        </span>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
