import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/dbConnection";
import { getEmailHistory } from "@/backend/controllers";

export async function GET(req: NextRequest) {
  try {
    connectToDatabase();

    const user = await req.json();

    const { emailHistory, message, status } = await getEmailHistory(user);

    return NextResponse.json({ emailHistory, message }, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
