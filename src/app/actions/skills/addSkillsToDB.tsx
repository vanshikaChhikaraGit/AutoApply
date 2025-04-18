"use server"

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

type inputArgs = {
    skills:string[]
}
export async function onIntegrateSkillsToDB({skills}:inputArgs){
try {
    const User = await currentUser();
    if (!User) {
      console.error("Error: No current user found.");
      return { status: 400, message: "User not authenticated." };
    }

    const existingUser = await prisma.user.findUnique({
      where: { externalId: User.id },
      select: { id: true },
    });

    if (!existingUser) {
      console.error("Error: User not found in database.");
      return { status: 400, message: "User not found in database." };
    }else{
        await prisma.user.update({
           where:{id:existingUser.id},
           data:{
               skills:skills
           }
        })
   }
   return { status: 200, message: "Updated user's skills." };



}catch(error){
    console.error("Error in updating user skills info server action:", error);
    return { status: 400, message: "Error! Couldn't update user's skills" };
}
}