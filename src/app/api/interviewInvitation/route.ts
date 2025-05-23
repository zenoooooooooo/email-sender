import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/dbConnection";
import { sendInterviewInvitation } from "@/backend/controllers";

export async function POST(req: NextRequest) {
  try {
    connectToDatabase();
    const data = await req.json();
    const user = data.user;
    const { message, status } = await sendInterviewInvitation(data, user);

    return NextResponse.json({ message }, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
