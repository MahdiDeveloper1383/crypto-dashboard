import { NextResponse } from "next/server";

export async function POST() {
    const respone = NextResponse.json({
        success:true
    })
    respone.cookies.set("token","",{
       httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
    })
    return respone;
}