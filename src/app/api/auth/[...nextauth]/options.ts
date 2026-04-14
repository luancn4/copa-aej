import type { NextAuthOptions } from "next-auth";
import Discord from "next-auth/providers/discord";

export const options: NextAuthOptions = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization:
        "https://discord.com/oauth2/authorize?scope=identify+guilds",
    }),
  ],
  pages: {
    signIn: "/",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/albums";
    },

    async signIn({ account }) {
      const discordToken = account?.access_token;

      const discordUser = await fetch(`https://discord.com/api/users/@me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${discordToken}`,
        },
      }).then((res) => res.json());

      console.log(discordUser);

      return true;
    },
  },
};
