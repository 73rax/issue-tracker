import { patchIssueSchema } from "@/app/ValidationSchema";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const { assignedToUserId, title, description, status } = body;

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (status !== null && status !== undefined && status.trim() === "") {
    return NextResponse.json(
      { error: "Status cannot be an empty string." },
      { status: 400 }
    );
  }

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json(
      { error: "Issue does not exist." },
      { status: 404 }
    );

  // const updatedIssue = await prisma.issue.update({
  //   where: { id: issue.id },
  //   data: {
  //     title,
  //     description,
  //     assignedToUserId,
  //     status,
  //   },
  // });
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
      status: status !== undefined ? status : undefined, // Set status only if provided
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json(
      { error: "Issue does not exist" },
      { status: 404 }
    );

  const deletedIssue = await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
