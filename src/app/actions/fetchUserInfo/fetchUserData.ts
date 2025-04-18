"use server"

import { auth } from "@clerk/nextjs/server"


export const getUserData = async()=>{
const { userId,sessionId } = await auth()
console.log('your id is',userId)
console.log('session id',sessionId)
return {result:userId}

}