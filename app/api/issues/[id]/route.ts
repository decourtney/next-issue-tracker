import { patchIssueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const PATCH = auth(async function PATCH(req, ctx) {
  if (!req.auth)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const params = ctx.params as { id: string };
  const body = await req.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });

    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
});

export const DELETE = auth(async function DELETE(req, ctx) {
  if (!req.auth)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const params = ctx.params as { id: string };

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
});
