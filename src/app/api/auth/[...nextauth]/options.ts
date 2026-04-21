import type { NextAuthOptions } from "next-auth";
import Discord from "next-auth/providers/discord";
import { bootstrapDiscordUser } from "@/lib/bootstrap-user";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization:
        "https://discord.com/oauth2/authorize?scope=identify+email",
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "discord" && profile) {
        return bootstrapDiscordUser({ token, account, profile });
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId ?? "";
        session.user.discordId = token.discordId;
        session.user.name = session.user.name ?? token.name ?? null;
        session.user.email = session.user.email ?? token.email ?? null;
        session.user.image =
          session.user.image ??
          (typeof token.picture === "string" ? token.picture : null);
      }

      session.albumSlug = token.albumSlug;

      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl + "/albums";
    },
  },
};
