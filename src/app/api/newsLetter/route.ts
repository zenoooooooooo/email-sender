import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/dbConnection";
import { sendNewsLetter } from "@/backend/controllers";

export async function POST(req: NextRequest) {
  try {
    connectToDatabase();
    const data: INewsLetter = await req.json();

    const { message, status } = await sendNewsLetter(data);
    return NextResponse.json({ message }, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
