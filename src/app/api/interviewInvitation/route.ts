import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/backend/db/dbConnection"
import { sendInterviewInvitation } from "@/backend/controllers"

export async function POST(req: NextRequest) {
    try {
        connectToDatabase()
        const data: IInterviewInvitation = await req.json()
        
        const response = await sendInterviewInvitation(data)
        
        return NextResponse.json(
            { message: response.message },
            { status: response.status }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}