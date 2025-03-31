"use server"

import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

type inputArgs = {
universityName:string,
degree:string,
major:string,
cgpa: number,
enrollmentNo:string|null,
startMonth:number,
startYear:number,
endMonth:number,
endYear:number,
currentYearOfStudy:string,
currentSem:string
}

export async function onIntegerateEducationToDB({
    universityName,
    degree,
    major,
    cgpa,
    enrollmentNo,
    startMonth,
    startYear,
    endMonth,
    endYear,
    currentYearOfStudy,
    currentSem
    }:inputArgs){

        try{
      const User = await currentUser()
      if(!User)return;

      const existingUser = await prisma.user.findUnique({
         where:{ externalId:User.id },
         select:{ id:true }
      })
      if (!existingUser) {
        throw new Error("User not found in database");
      }

      // Step 1: Find if the user's education record exists
    const existingEducation = await prisma.education.findFirst({
      where: { userId: existingUser.id },
      select: { id: true },
    });

    if (existingEducation) {
      // Step 2: If education exists, update it
      await prisma.education.update({
        where: { id: existingEducation.id }, // Use the unique ID
        data: {
          institution_name: universityName,
          degree: degree,
          major: major,
          cgpa: cgpa,
          enrollment_no: enrollmentNo,
          start_month: startMonth,
          start_year: startYear,
          end_month: endMonth,
          end_year: endYear,
          current_semester: currentSem,
          current_year_of_study: currentYearOfStudy,
        },
      });
    } else {
      // Step 3: If education doesn't exist, create a new record
      await prisma.education.create({
        data: {
          userId: existingUser.id, // Link to the user
          institution_name: universityName,
          degree: degree,
          major: major,
          cgpa: cgpa,
          enrollment_no: enrollmentNo,
          start_month: startMonth,
          start_year: startYear,
          end_month: endMonth,
          end_year: endYear,
          current_semester: currentSem,
          current_year_of_study: currentYearOfStudy,
        },
      });
    }
        return{
            status:200,
            message:"Successully added user's education details."
          }
      
      
      } catch (error) {
        console.log("error in adding education info to db server action:",error)
        return{
            status:400,
            message:"Error! Couldn't update user's education details."
        }
      }
}