import { issueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  // if (!req.auth)
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(users);
});
