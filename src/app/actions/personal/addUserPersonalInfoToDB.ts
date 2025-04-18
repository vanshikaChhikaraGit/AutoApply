"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

type inputArgs = {
  state: string;
  country: string;
  address: string;
  phone_number: string;
  dob: string;
};

export async function onIntegrateUserPersonalInfoToDB({
  state,
  country,
  address,
  phone_number,
  dob,
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
    } else {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          dob,
          phone_number,
          state,
          country,
          address,
        },
      });
    }
    return { status: 200, message: "Updated user's information." };
  } catch (error) {
    console.error("Error in updating user personal info server action:", error);
    return {
      status: 400,
      message: "Error! Couldn't update user's information",
    };
  }
}
