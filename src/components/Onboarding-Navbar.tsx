"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { MaxWidthWrapper } from "./max-width-wrapper";

const steps = [
  { path: "/onboarding/profile", label: "Profile" },
  { path: "/onboarding/education", label: "Education" },
  { path: "/onboarding/carryover", label: "Carry Over" },
  { path: "/onboarding/workauth", label: "Work Authorization" },
  { path: "/onboarding/skills", label: "Skills" },
  { path: "/onboarding/personal", label: "Personal" },
  { path: "/onboarding/links", label: "Links" },
];

const OnboardingNavbar = () => {
  
  const currentRoute = usePathname();

  // ✅ Compare 'path' instead of 'label'
  const currentRouteIndex = steps.findIndex((step) => step.path === currentRoute);

  return (
    <div>
        <MaxWidthWrapper classname={"mt-12"}>
      <nav className="hidden md:m-4 md:flex md:justify-start md:gap-0 md:overflow-x-auto lg:justify-center">
        {steps.map((step, index) => (
          <div
            key={step.path}
            className={`${
              index <= currentRouteIndex
                ? "text-brand-500 border-b-brand-500 border-b-4 rounded-none "
                : "text-gray-500"
            } inline-block whitespace-nowrap border-b-4 px-6 pb-4 text-base leading-5 font-bold pointer-events-none`}
          >
            {step.label}
          </div>
        ))}
      </nav>
      </MaxWidthWrapper>
    </div>
  );
};

export default OnboardingNavbar;
