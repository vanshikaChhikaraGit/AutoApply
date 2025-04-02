"use client";

import CarryOver from "@/components/carryover/carryOver";
import Education from "@/components/education/Education";
import EEOcomponent from "@/components/eeo/EEOComp";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import OnboardingNavbar from "@/components/Onboarding-Navbar";
import Profile from "@/components/profile/Profile";
import WorkAuthComponent from "@/components/workauth/WorkAuth";
import { useParams } from "next/navigation";
import React from "react";

const OnboardingStep = () => {
  const params = useParams();
  const step = params.step as string;

  return (
    <div>
      <MaxWidthWrapper classname="mt-4">
        <OnboardingNavbar />
        {step === "profile" && <div className="p-2 m-3"><Profile></Profile></div>}
        {step === "education" && <div className="p-2 m-3"><Education></Education></div>}
        {step === "carryover" && <div className="p-2 m-3"><CarryOver></CarryOver></div>}
        {step === "workauth" && <div className="p-2 m-3"><WorkAuthComponent></WorkAuthComponent></div>}
        {step === "eeo" && <div className="p-2 m-3"><EEOcomponent></EEOcomponent></div>}
        {!["profile", "education","carryover","workauth","eeo"].includes(step) && (
          <p className="text-red-500">Invalid step! Please go back.</p>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

// ✅ Ensure valid default export
export default OnboardingStep;
