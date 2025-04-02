"use server"

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

type inputArgs = {
    ethnicity: string, 
    disability: "Yes" | "No" | "Prefer Not To Say",  
    lgbtq: "Yes" | "No" | "Prefer Not To Say",      
    gender: "Male" | "Female" | "Non-Binary" | "Prefer Not To Say" 
};

export async function onIntgrateUserEEOInfo({ethnicity,disability,lgbtq,gender}:inputArgs){
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
                    ethnicity,
                    is_lgbtq:lgbtq,
                    has_disability:disability,
                    gender
                }
             })
        }
        return { status: 200, message: "Updated user's EEO details." };
      } catch (error) {
        console.error("Error in updating user work auth info server action:", error);
        return { status: 400, message: "Error! Couldn't update user's EEO details" };
      }
}