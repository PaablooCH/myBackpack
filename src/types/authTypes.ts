import { auth } from "../lib/auth/server";

export type Session = Awaited<ReturnType<typeof auth.getSession>>;
export type User = NonNullable<Session["data"]>["user"];