import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/albums/:path*"],
};

const authProxy = withAuth({
  pages: {
    signIn: "/",
  },
});

export default function proxy(...args: Parameters<typeof authProxy>) {
  return authProxy(...args);
}
