"use server"

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function syncUserToDB(): Promise<{ success: boolean } | { error: string; status: number }> {
  try {
    const User = await currentUser();
    if (!User) {
      return { error: "Unauthorized", status: 401 };
    }

    const existingUser = await prisma.user.findFirst({
      where: { externalId: User.id },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: User.emailAddresses[0]?.emailAddress,
          name: `${User.firstName} ${User.lastName}`,
          externalId: User.id,
        },
      });
    }

    return { success: true };
  } catch (error: any) {
    return { error: error.message, status: 500 };
  }
}

