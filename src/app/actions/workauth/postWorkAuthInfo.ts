"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

type inputArgs = {
  is_authorized_to_work: string;
  visa_sponsorship_requirement: string;
};

export async function onIntegerateWorkAuthInfo({
  is_authorized_to_work,
  visa_sponsorship_requirement,
}: inputArgs) {
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
    }

    const existingJobPreferences = await prisma.jobPreferences.findFirst({
      where: { userId: existingUser.id },
    });

    if (existingJobPreferences) {
      try {
        await prisma.jobPreferences.update({
          where: { id: existingJobPreferences.id },
          data: {
            is_authorized_to_work,
            visa_sponsorship_requirement,
          },
        });
      } catch (updateError) {
        console.error("Error updating jobPreferences:", updateError);
        return { status: 400, message: "Failed to update job preferences." };
      }
    } else {
      try {
        await prisma.jobPreferences.create({
          data: {
            userId: existingUser.id,
            is_authorized_to_work,
            visa_sponsorship_requirement,
          },
        });
      } catch (createError) {
        console.error("Error creating jobPreferences:", createError);
        return { status: 400, message: "Failed to create job preferences." };
      }
    }

    return { status: 200, message: "Updated user's work authorization details." };
  } catch (error) {
    console.error("Error in updating user work auth info server action:", error);
    return { status: 400, message: "Error! Couldn't update user's work authorization details" };
  }
}
