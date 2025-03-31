import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request){
    const res = await request.json()
    const {title, content} = res;

    const result = await prisma.post.create({
        data: {
            title,
            content,
            published: true,
            author: {
                create: {
                    email: 'gitikabhatia@gmail.com',
                }
            }
        }
    })
    return NextResponse.json({result})
}