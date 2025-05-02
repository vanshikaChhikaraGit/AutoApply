export const dynamic = 'force-dynamic';

import { getUserData } from "@/app/actions/fetchUserInfo/fetchUserData";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const JWT_ISSUER = process.env.JWT_ISSUER

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization || !authorization.startsWith("Bearer")) {
      return NextResponse.json(
        { error: "Authorization token missing or malformed" },
        { status: 400 }
      );
    }
    const jwt = authorization.slice(7);
    const { payload } = await jose.jwtVerify(jwt, JWT_SECRET, {
      issuer: JWT_ISSUER,
    });

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid session token" },
        { status: 401 }
      );
    }

    const userId = payload.userId
    console.log(userId);
    const userInfo = await getUserInfo(userId);
    return NextResponse.json({ userInfo: userInfo }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "failed to load data" });
  }
}

async function getUserInfo(userId: any) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      education: true,
      workExperience: true,
      resume: true,
      backlog: true,
      jobPreferences: true,
      links: true,
    },
  });
}
