"use server"

import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

type inputArgs = {
    totalBacklogs: number | null
    activeBacklogs: number | null
    deadBacklogs: number | null
    hasBacklog: string
}
export async function integerateCarryOverInfoToDB({totalBacklogs,activeBacklogs,deadBacklogs,hasBacklog}:inputArgs){
    try {
        const user = await currentUser()
    if(!user)return
    const exisitingUser = await prisma.user.findUnique({
        where:{externalId:user.id}
    })
    if(!exisitingUser)return{
        status:400,
        message:"User not found"
    }
    const exisitingBacklogInfo = await prisma.backlog.findFirst({
        where:{userId:exisitingUser.id},
        select:{id:true}
    })

    if(exisitingBacklogInfo){
        await prisma.backlog.update({
            where:{id:exisitingBacklogInfo.id},
            data:{
                has_backlog:hasBacklog,
                total_backogs:totalBacklogs,
                active_backlogs:activeBacklogs,
                dead_backlogs:deadBacklogs
            }
        })
    }else{
        await prisma.backlog.create({
            data:{
                total_backogs:totalBacklogs,
                active_backlogs:activeBacklogs,
                dead_backlogs:deadBacklogs,
                has_backlog:hasBacklog,
                userId:exisitingUser.id,
            }
        })
    }
    return{
        status:200,
        message:"Successully added user's education details."
      }
    } catch (error) {
        console.log("error in adding backlog info in db server action : ",error)
        return{
            status:400,
            message:"Error Occured while adding user's carryover details."
          }
    }
    
} 