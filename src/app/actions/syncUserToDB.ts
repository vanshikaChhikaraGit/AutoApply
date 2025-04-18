"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import * as jose from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const JWT_ISSUER = "http://localhost";

if (!JWT_SECRET) {
  console.error("couldnt find jwt secret ", error);
  throw new Error("please provide jwt secret ");
}
if (!JWT_ISSUER) {
  console.error("couldnt find jwt issuer", error);
  throw new Error("please provide jwt issuer");
}

export async function syncUserToDB(): Promise<
  { success: boolean } | { error: string; status: number }
> {
  try {
    const User = await currentUser();
    if (!User) {
      return { error: "Unauthorized", status: 401 };
    }

    let existingUser = await prisma.user.findFirst({
      where: { externalId: User.id },
    });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          email: User.emailAddresses[0]?.emailAddress,
          name: `${User.firstName} ${User.lastName}`,
          externalId: User.id,
        },
      });
    }

    const sessionToken = await generateJWT(existingUser.id);
    cookies().set({
      name:'JWT_TOKEN',
      value:sessionToken,
      httpOnly:true,
      secure:process.env.MODE==='production',
      sameSite:'lax',
      domain: 'localhost', // Allow subdomains
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    console.log("session token", sessionToken)
    return { success: true};
  } catch (error: any) {
    return { error: error.message, status: 500 };
  }
}

async function generateJWT(userId: string) {
  const token = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(JWT_ISSUER)
    .setExpirationTime("30d")
    .setIssuedAt()
    .sign(JWT_SECRET);

  return token;
}
