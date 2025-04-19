import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/db/dbConnection";
import { sendNewsLetter } from "@/backend/controllers";

export async function POST(req: NextRequest) {
    try {
        connectToDatabase();
        const data: INewsLetter = await req.json();
        
        const response = await sendNewsLetter(data)
        return NextResponse.json(
            { message: response.message },
            { status: response.status }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}   