import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/dbConnection";
import { registerUser } from "@/backend/controllers";
import { IUser } from "@/types/IUser";
export async function POST(req: NextRequest) {
  try {
    connectToDatabase();

    const data: IUser = await req.json();

    const { message, status } = await registerUser(data);

    return NextResponse.json({ message }, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
