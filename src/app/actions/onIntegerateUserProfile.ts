"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

type inputArgs = {
  name: string;
  firstName: string;
  lastName: string;
  resume_uploadcare_uuid: string;
  resume_google_drive_link: string;
};

export const onIntegerateUserProfile = async ({
  name,
  firstName,
  lastName,
  resume_uploadcare_uuid,
  resume_google_drive_link,
}: inputArgs) => {
  //find user

  const user = await currentUser();

  if (!user) return;

  const existingUser = await prisma.user.findUnique({
    where: { externalId: user.id }, // Fetch user by Clerk ID
    select: { id: true }, // Only retrieve database id
  });

  if (!existingUser) {
    throw new Error("User not found in database");
  }
  try {
    //update their details in user model
  const addUserDetails = await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      first_name: firstName,
      last_name: lastName,
      name: name,
    },
  });

  //add the resume details and link to the user model
  const addResumeDetails = await prisma.resume.create({
    data: {
      userId: existingUser.id,
      resume_file_path: resume_uploadcare_uuid,
      resume_drive_link: resume_google_drive_link,
    },
  });

  return{
    status:200,
    message:"Successully added user profile details."
  }
  } catch (error) {
    console.log("error in adding profile info to db server action:",error)
    return{
        status:400,
        message:"Error! Couldn't update user profile details."
    }
  }
};
