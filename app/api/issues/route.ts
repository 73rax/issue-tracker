import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../ValidationSchema";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/AuthOptions";

// Make a post request
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({}, {status: 401})


  // take the request and save it to a body
  const body = await request.json();

  // validate the data using zod
  const validation = issueSchema.safeParse(body);

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
