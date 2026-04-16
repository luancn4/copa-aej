import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export function auth() {
  return getServerSession(options);
}
