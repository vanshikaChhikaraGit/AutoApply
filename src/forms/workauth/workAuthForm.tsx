"use client"

import { workAuthFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { onIntegerateWorkAuthInfo } from "@/app/actions/workauth/postWorkAuthInfo";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/loading-spinner";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type Props = {};

const WorkAuthForm = (props: Props) => {
    const [loading,setLoading] = useState(false)
    const router = useRouter()
  const workAuthForm = useForm<z.infer<typeof workAuthFormSchema>>({
    resolver: zodResolver(workAuthFormSchema),
  });

  const onHandleSubmit = async (values: z.infer<typeof workAuthFormSchema>) => {
    try {
        setLoading(true)
        const addUserWorkAuthInfo = await onIntegerateWorkAuthInfo({
            is_authorized_to_work: values.is_authorized_to_work,
            visa_sponsorship_requirement: values.require_visa_sponsorship,
          });
          if (addUserWorkAuthInfo) {
            if (addUserWorkAuthInfo.status === 200) {
                
              toast("Success 🎉", {
                description: (
                  <span className="text-sm text-black">
                    {addUserWorkAuthInfo.message}
                  </span>
                ),
              });
              setLoading(false)
              router.push('/onboarding/skills') 
            } else {
                setLoading(false)
              toast("Error 😭", {
                description: (
                  <span className="text-sm text-black">
                    {addUserWorkAuthInfo.message}
                  </span>
                ),
              });
            }
          }
    } catch (error) {
        setLoading(false)
        console.error("Error submitting work auth info", error);
    }
    
  };
  return (
    <div className="mt-10">
      <Form {...workAuthForm}>
        <form onSubmit={workAuthForm.handleSubmit(onHandleSubmit)}>
          <FormField
            control={workAuthForm.control}
            name="is_authorized_to_work"
            render={({ field }) => (
              <FormItem className="flex m-4 justify-between">
                <FormLabel>
                  Are you authorised to work in your country?
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="hover:cursor-pointer">
                      <SelectValue placeholder={"Select"}></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="hover:cursor-pointer" value="yes">Yes</SelectItem>
                      <SelectItem className="hover:cursor-pointer" value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={workAuthForm.control}
            name="require_visa_sponsorship"
            render={({ field }) => (
              <FormItem className="flex justify-between m-4">
                <FormLabel>
                  Will you now or in future require visa sponsorship?
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="hover:cursor-pointer">
                      <SelectValue placeholder={"Select"}></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="hover:cursor-pointer" value="yes">Yes</SelectItem>
                      <SelectItem className="hover:cursor-pointer" value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
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
      <Link href={"/onboarding/skills"}
            className="underline text-gray-600 text-md text-center m-4 flex justify-center font-semibold"
            > {" "} Skip this step
            </Link>
    </div>
  );
};

export default WorkAuthForm;
