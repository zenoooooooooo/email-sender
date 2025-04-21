import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/dbConnection";
import { sendPasswordReset } from "@/backend/controllers";

export async function POST(req: NextRequest) {
  try {
    connectToDatabase();

    const data: IPasswordReset = await req.json();

    const { message, status } = await sendPasswordReset(data);

    return NextResponse.json({ message }, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
