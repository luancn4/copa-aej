"use client";

import { useMemo, useState } from "react";
import type { AlbumDetail, AlbumStickerItem } from "@/lib/catalog";

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
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-zinc-500">Faltando</p>
          <p className="text-2xl font-semibold text-zinc-900">
            {summary.missingCount}
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-zinc-500">Obtidas</p>
          <p className="text-2xl font-semibold text-zinc-900">
            {summary.ownedUnique}
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-zinc-500">Repetidas</p>
          <p className="text-2xl font-semibold text-zinc-900">
            {summary.duplicateCount}
          </p>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {!isOwner ? (
        <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Visualizacao publica. Apenas o dono do album pode alterar quantidades.
        </p>
      ) : null}

      <div className="space-y-6">
        {groupedStickers.map(([groupName, groupStickers]) => (
          <section key={groupName} className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                {groupName}
              </h3>
              <p className="text-sm text-zinc-500">
                {groupStickers.filter((sticker) => sticker.quantity > 0).length}{" "}
                de {groupStickers.length} obtidas
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {groupStickers.map((sticker) => {
                const isPending = pendingStickerId === sticker.id;
                const hasDuplicates = sticker.quantity > 1;

                return (
                  <article
                    key={sticker.id}
                    className="rounded-xl bg-white p-4 shadow-sm"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                          #{sticker.code}
                        </p>
                        <p className="font-medium text-zinc-900">
                          {sticker.label}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          sticker.quantity === 0
                            ? "bg-zinc-100 text-zinc-600"
                            : hasDuplicates
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {sticker.quantity === 0
                          ? "faltando"
                          : hasDuplicates
                            ? `${sticker.quantity} copias`
                            : "obtida"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-zinc-200">
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
                          className="px-3 py-1 text-lg text-zinc-700 disabled:cursor-not-allowed disabled:text-zinc-300"
                        >
                          -
                        </button>
                        <span className="min-w-10 text-center text-sm font-medium text-zinc-900">
                          {sticker.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(sticker.id, sticker.quantity + 1)
                          }
                          disabled={!isOwner || isPending}
                          className="px-3 py-1 text-lg text-zinc-700 disabled:cursor-not-allowed disabled:text-zinc-300"
                        >
                          +
                        </button>
                      </div>
                      {isPending ? (
                        <span className="text-xs text-zinc-400">
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
