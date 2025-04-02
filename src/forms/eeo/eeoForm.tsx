"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eeoFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingSpinner } from "@/components/loading-spinner";
import { FaArrowRightLong } from "react-icons/fa6";
import { onIntgrateUserEEOInfo } from "@/app/actions/eeo/addEEOInfo";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
//ask about ethinity,disablitiy, gender, and lgbtq+
//every ques should have an option of prefer not to say
type Props = {};
const ethnicityOptions = [
  "Hispanic or Latino",
  "White (Not Hispanic or Latino)",
  "Black or African American",
  "Asian",
  "Native Hawaiian or Other Pacific Islander",
  "American Indian or Alaska Native",
  "Two or More Races (Multiracial)",
  "Middle Eastern / North African (MENA)",
  "Other",
  "Prefer not to say",
];

const userOptions = ["Yes", "No", "Prefer Not To Say"];

const genderOptions = ["Female", "Male", "Non-Binary", "Prefer Not To Say"];

const EeoFormComp = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const eeoForm = useForm<z.infer<typeof eeoFormSchema>>({
      resolver: zodResolver(eeoFormSchema),
      mode: "onSubmit",
    });
  
    const onHandleSubmit = async (values: z.infer<typeof eeoFormSchema>) => {
      try {
        setLoading(true);
        const addUserEEOInfoToDB = await onIntgrateUserEEOInfo({
          ethnicity: values.ethnicity,
          disability: values.disability,
          lgbtq: values.lgbtq,
          gender: values.gender,
        });
        if (addUserEEOInfoToDB) {
          if (addUserEEOInfoToDB.status === 200) {
            toast("Success 🎉", {
              description: (
                <span className="text-sm text-black">
                  {addUserEEOInfoToDB.message}
                </span>
              ),
            });
            setLoading(false)
            router.push("/onboarding/skills")
          } else {
            setLoading(false)
            toast("Error 😭", {
              description: (
                <span className="text-sm text-black">
                  {addUserEEOInfoToDB.message}
                </span>
              ),
            });
          }
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
  
    return (
      <div>
        <Form {...eeoForm}>
          <form onSubmit={eeoForm.handleSubmit(onHandleSubmit)}>
            <FormField
              name="ethnicity"
              control={eeoForm.control}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between m-4">
                  <FormLabel>What is your ethnicity?</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value ?? undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="hover:cursor-pointer m-1">
                        <SelectValue placeholder="select" />
                      </SelectTrigger>
                      <SelectContent>
                        {ethnicityOptions.map((ethnicGrp, index) => (
                          <SelectItem
                            key={index}
                            className="hover:cursor-pointer"
                            value={ethnicGrp}
                          >
                            {ethnicGrp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
  
            <FormField
              name="disability"
              control={eeoForm.control}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between m-4">
                  <FormLabel>Do you have a disability?</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                    {userOptions.map((option, index) => (
                      <div
                      key={index}
                      onClick={() => field.onChange(option)}  // Update the field value on click
                      className={`p-2 m-1 text-black/80 text-sm border-1 border-gray-200 rounded-lg font-medium cursor-pointer ${field.value === option ? 'bg-brand-500 text-white' : 'bg-gray-100/40'}`}
                    >
                      {option}
                    </div>
                    ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
  
            <FormField
              name="lgbtq"
              control={eeoForm.control}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between m-4">
                  <FormLabel>Do you identify as LGBTQ+?</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                    {userOptions.map((option, index) => (
                      <div
                      key={index}
                      onClick={() => field.onChange(option)}  // Update the field value on click
                      className={`p-2 m-1 text-black/80 text-sm border-1 border-gray-200 rounded-lg font-medium cursor-pointer ${field.value === option ? 'bg-brand-500 text-white' : 'bg-gray-100/40'}`}
                      >
                      {option}
                    </div>
                    ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
  
            <FormField
              name="gender"
              control={eeoForm.control}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between m-4">
                  <FormLabel>What is your gender?</FormLabel>
                  <FormControl>
                  <div className="flex items-center">
                    {genderOptions.map((option, index) => (
                        <div
                        key={index}
                        onClick={() => field.onChange(option)}  // Update the field value on click
                        className={`p-2 m-1 text-black/80 text-sm border-1 border-gray-200 rounded-lg font-medium cursor-pointer ${field.value === option ? 'bg-brand-500 text-white' : 'bg-gray-100/40'}`}
                        >
                        {option}
                      </div>
                    ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
  
            {/* submit */}
            <Button
              type="submit"
              disabled={loading}
              className="flex justify-center mx-auto p-5 text-white bg-brand-500 rounded-lg hover:bg-brand-600 hover:cursor-pointer mt-4"
            >
              {loading ? (
                <>
                  Saving <LoadingSpinner></LoadingSpinner>{" "}
                </>
              ) : (
                <>
                  Save & Continue <FaArrowRightLong></FaArrowRightLong>{" "}
                </>
              )}
            </Button>
          </form>
        </Form>
        <Link
          href={"/onboarding/skills"}
          className="underline text-gray-600 text-md text-center m-4 flex justify-center font-semibold"
        >
          {" "}
          Skip this step
        </Link>
      </div>
    );
  };
  

export default EeoFormComp;
