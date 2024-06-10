"use server"

import { prisma } from "@/lib/db"
import { error } from "console";
import { revalidatePath } from "next/cache";

export async function createPage(name: string, description: string) {
    try {
       const { id } = await prisma.page.create({
            data: {
                name,
                description,
            },
        })

        return id;

    }catch(err){
        console.error(error);
        throw new Error("Could not create the page")
    }

}

export async function getPage(id: number) {
    try {
        const page = await prisma.page.findUnique({
            where: {
                id,
            }
        })

        return page;

    }catch(err){
        console.error(err);
        throw new Error("Could not retrieve or find page")
    }
}

export async function updatePageContent(id: number, jsonContent: string){
        //TODO: validate user permission
        revalidatePath("/app");
        return await prisma.page.update({
            where: {
                id,
            },
            data: {
                content: jsonContent
            }
        })
}

export async function publishPageContent(id: number, NewPublish: boolean){
    try {
        await prisma.page.update({
            where: {
                id,
            },
            data: {
                published: NewPublish,
            }
        })
 
 
     }catch(err){
         console.error(error);
         throw new Error("Could not create the page")
     }
}