import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/backend/db/dbConnection"

export async function POST(req: NextRequest) {
    try {
        connectToDatabase();
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}