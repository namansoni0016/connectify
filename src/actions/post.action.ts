"use server";

import { revalidatePath } from "next/cache";
import { getDbUserId } from "./user.action";
import prisma from "@/lib/prisma";

export async function createPost(content:string, image:string) {
    try {
        const userId = await getDbUserId();
        const post = await prisma.post.create({
            data: {
                content,
                image,
                authorId: userId
            }
        });
        revalidatePath("/");
        return {success: true, post}
    } catch (error) {
        console.log("Failed to create post: ", error);
        return { success: false, error: "Failed to create post"}
    }
} 