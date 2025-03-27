"use client";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import OnboardingNavbar from "@/components/Onboarding-Navbar";
import { useParams } from "next/navigation";
import React from "react";

const OnboardingStep = () => {
  const params = useParams();
  const step = params.step as string;

  return (
    <div>
      <MaxWidthWrapper classname="mt-4">
        <OnboardingNavbar />
        {step === "profile" && <div>Profile</div>}
        {step === "education" && <div>Education</div>}
        {!["profile", "education"].includes(step) && (
          <p className="text-red-500">Invalid step! Please go back.</p>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

// ✅ Ensure valid default export
export default OnboardingStep;
