import type { Account, Profile } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { DEFAULT_ALBUM_NAME, DEFAULT_ALBUM_SLUG } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

type DiscordProfile = Profile & {
  id: string;
  username?: string;
  email?: string | null;
  image_url?: string;
};

export async function bootstrapDiscordUser({
  token,
  account,
  profile,
}: {
  token: JWT;
  account: Account;
  profile: Profile;
}) {
  const discordProfile = profile as DiscordProfile;

  if (!discordProfile.id) {
    return token;
  }

  const image =
    discordProfile.image_url ??
    (typeof token.picture === "string" ? token.picture : null);

  const user = await prisma.user.upsert({
    where: { discordId: discordProfile.id },
    update: {
      name: discordProfile.username ?? token.name ?? "Discord user",
      email: discordProfile.email ?? null,
      image,
    },
    create: {
      discordId: discordProfile.id,
      name: discordProfile.username ?? token.name ?? "Discord user",
      email: discordProfile.email ?? null,
      image,
    },
  });

  await prisma.album.upsert({
    where: {
      userId: user.id,
    },
    update: {
      slug: DEFAULT_ALBUM_SLUG,
      name: DEFAULT_ALBUM_NAME,
    },
    create: {
      userId: user.id,
      slug: DEFAULT_ALBUM_SLUG,
      name: DEFAULT_ALBUM_NAME,
    },
  });

  token.userId = user.id;
  token.discordId = user.discordId;
  token.albumSlug = DEFAULT_ALBUM_SLUG;
  token.name = user.name;
  token.email = user.email ?? undefined;
  token.picture = user.image ?? undefined;
  token.accessToken = account.access_token;

  return token;
}
