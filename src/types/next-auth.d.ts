import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    albumSlug?: string;
    user: DefaultSession["user"] & {
      id: string;
      discordId?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    albumSlug?: string;
    discordId?: string;
    userId?: string;
  }
}
