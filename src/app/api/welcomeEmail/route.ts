import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/dbConnection";
import { sendWelcomeEmail } from "@/backend/controllers";

export async function POST(req: NextRequest) {
  try {
    connectToDatabase();

    const data: IWelcomeEmail = await req.json();

    const { message, status } = await sendWelcomeEmail(data);

    return NextResponse.json({ message }, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
