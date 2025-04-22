import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/dbConnection";
import { loginUser } from "@/backend/controllers";
import { IUser } from "@/types/IUser";

export async function POST(req: NextRequest) {
  try {
    connectToDatabase();

    const data: Omit<IUser, "name"> = await req.json();

    const { message, token, name, status } = await loginUser(data);

    return NextResponse.json({ message, token, name }, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
