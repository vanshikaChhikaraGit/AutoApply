import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MaxWidthWrapper } from "./max-width-wrapper";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav>
      <MaxWidthWrapper classname="mt-4">
        <div className="flex justify-between items-center">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex flex-row items-center">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <h2 className="font-bold text-2xl ml-1">Auto Apply</h2>
          </Link>

          {/* Authentication Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant={"ghost"} asChild>
                  <SignOutButton  />
                </Button>
              </>
            ) : (
              <>
                <Button asChild>
                  <SignInButton />
                </Button>
                <Button asChild>
                 
                  <SignUpButton />
                </Button>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
