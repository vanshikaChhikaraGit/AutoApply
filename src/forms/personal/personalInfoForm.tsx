"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { indianStatesAndUTs } from "@/constants/constants";
import { personalFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import { useState, useEffect } from "react";
import { onIntegrateUserPersonalInfoToDB } from "@/app/actions/personal/addUserPersonalInfoToDB";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/loading-spinner";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type Props = {};

const PersonalInfoForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  // Use this effect to update the form field when all are selected
  useEffect(() => {
    if (day && month && year) {
      const formatted = `${day}/${month}/${year}`; // format: dd/mm/yyyy
      userPersonalInfoForm.setValue("dob", formatted); // Set form value
    }
  }, [day, month, year]);

  const currentYear = new Date().getFullYear();
  const userPersonalInfoForm = useForm<z.infer<typeof personalFormSchema>>({
    resolver: zodResolver(personalFormSchema),
  });

  const onHandleSubmit = async (values: z.infer<typeof personalFormSchema>) => {
    try {
      setLoading(true)
      const addUserPersonalInfoToDb = await onIntegrateUserPersonalInfoToDB({
        address: values.address,
        state: values.state,
        country: values.country,
        dob: values.dob,
        phone_number: values.phone_number,
      });

      if (addUserPersonalInfoToDb) {
        if (addUserPersonalInfoToDb.status === 200) {
          toast("Success 🎉", {
            description: (
              <span className="text-sm text-black">
                {addUserPersonalInfoToDb.message}
              </span>
            ),
          });
          setLoading(false);
          // Redirect to the next page after success
          router.push("/onboarding/links");
        } else {
          setLoading(false);
          toast("Error 😭", {
            description: (
              <span className="text-sm text-black">
                {addUserPersonalInfoToDb.message}
              </span>
            ),
          });
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in handleSubmit:", error);
      toast("Something went wrong :(", {
        description: "Please try again later.",
      });
    }
  };
  return (
    <div>
      <Form {...userPersonalInfoForm}>
        <form onSubmit={userPersonalInfoForm.handleSubmit(onHandleSubmit)}>
          {/* country  */}
          <FormField
            name="country"
            control={userPersonalInfoForm.control}
            render={({ field }) => (
              <FormItem className="flex items-center justify-between m-4 mt-10">
                <FormLabel className="text-xl">Select your country</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="hover:cursor-pointer">
                      <SelectValue placeholder="Select"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="hover:cursor-pointer"
                        value="India"
                      >
                        India
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {/* state  */}
          <FormField
            name="state"
            control={userPersonalInfoForm.control}
            render={({ field }) => (
              <FormItem className="flex items-center justify-between m-4 mt-10">
                <FormLabel className="text-xl">Select your state</FormLabel>
                <FormControl>
                  <div>
                    <Select
                      defaultValue={field.value ?? undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="hover:cursor-pointer">
                        <SelectValue placeholder={"Select"}></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {indianStatesAndUTs.map((state, index) => (
                          <SelectItem
                            key={index}
                            className="hover:cursor-pointer"
                            value={state}
                          >
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {/* phone number  */}
          <FormField
  control={userPersonalInfoForm.control}
  name="phone_number"
  render={({ field }) => (
    <FormItem className="flex items-center justify-between m-4 mt-10">
      <FormLabel className="text-xl">Phone Number</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter your phone number"
          type="tel"
          className="w-auto"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

          {/* dob  */}
          <FormField
            name="dob"
            control={userPersonalInfoForm.control}
            render={({ field }) => (
              <FormItem className="flex items-center justify-between m-4 mt-10">
                <FormLabel className="text-xl">D.O.B</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    {/* Year */}
                    <Select onValueChange={setYear} value={year}>
                      <SelectTrigger className="w-[90px] hover:cursor-pointer">
                        <SelectValue placeholder="yyyy" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 100 }).map((_, i) => {
                          const y = currentYear - i;
                          return (
                            <SelectItem className="hover:cursor-pointer" key={y} value={y.toString()}>
                              {y}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    {/* Month */}
                    <Select onValueChange={setMonth} value={month}>
                      <SelectTrigger className="w-[70px] hover:cursor-pointer">
                        <SelectValue placeholder="mm" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }).map((_, i) => {
                          const m = (i + 1).toString();
                          return (
                            <SelectItem className="hover:cursor-pointer" key={m} value={m}>
                              {m}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    {/* Day */}
                    <Select onValueChange={setDay} value={day}>
                      <SelectTrigger className="w-[70px] hover:cursor-pointer">
                        <SelectValue placeholder="dd" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }).map((_, i) => {
                          const d = (i + 1).toString();
                          return (
                            <SelectItem className="hover:cursor-pointer" key={d} value={d}>
                              {d}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* address  */}
          <FormField
            name="address"
            control={userPersonalInfoForm.control}
            render={({ field }) => (
              <FormItem className="flex flex-col   m-4 mt-10">
                <FormLabel className="text-xl">Address</FormLabel>
                <FormControl>
                  <Input placeholder="type your address" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
         {/* submit  */}
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
        href={"/onboarding/links"}
        className="underline text-gray-600 text-md text-center m-4 flex justify-center font-semibold"
      >
        {" "}
        Skip this step
      </Link>
    </div>
  );
};

export default PersonalInfoForm;
