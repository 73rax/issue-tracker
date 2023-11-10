import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

// Make a post request
export async function POST(request: NextRequest) {
  // take the request and save it to a body
  const body = await request.json();

  // validate the data using zod
  const validation = createIssueSchema.safeParse(body);

  // if validation fails return error with status 400
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {status: 400});

  // create a new Issue with title and description in the database
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  // return it to the client
  return NextResponse.json(newIssue, { status: 201 });
}
