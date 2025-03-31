"use client";
{
  /* //ask if user has backlog
    //if yes then ask how many dead,active and total etc.
    //if no then just update db with no */
}
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { carryOverFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import { FaArrowRightLong } from "react-icons/fa6";
import { integerateCarryOverInfoToDB } from "@/app/actions/carryover/postCarryOverInfo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CarryOverForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const userBacklogForm = useForm<z.infer<typeof carryOverFormSchema>>({
    resolver: zodResolver(carryOverFormSchema),
    defaultValues: {
      hasBacklog: "",
      activeBacklogs: 0,
      totalBacklogs: 0,
      deadBacklogs: 0,
    },
  });

  const onHandleSubmit = async (
    values: z.infer<typeof carryOverFormSchema>
  ) => {
    try {
      setLoading(true);
      const payload = {
        hasBacklog: values.hasBacklog,
        activeBacklogs: values.hasBacklog === "no" ? 0 : values.activeBacklogs,
        deadBacklogs: values.hasBacklog === "no" ? 0 : values.deadBacklogs,
        totalBacklogs: values.hasBacklog === "no" ? 0 : values.totalBacklogs,
      };

      const postUserBacklogDetails = await integerateCarryOverInfoToDB(payload);
      if (postUserBacklogDetails) {
        if (postUserBacklogDetails?.status === 200) {
          if (postUserBacklogDetails.status === 200) {
            toast("Success 🎉", {
              description: (
                <span className="text-sm text-black">
                  {postUserBacklogDetails.message}
                </span>
              ),
            });
            setLoading(false);
            router.push("/onboarding/workauth");
          } else {
            setLoading(false);
            toast("😭Error", {
              description: (
                <span className="text-sm text-black">
                  {postUserBacklogDetails.message}
                </span>
              ),
            });
          }
        }
      }
    } catch (error) {
      console.error("Error submitting backlog info", error);
    }
  };
  const hasBacklog = userBacklogForm.watch("hasBacklog");

  return (
    <div className="mt-10">
      <Form {...userBacklogForm}>
        <form onSubmit={userBacklogForm.handleSubmit(onHandleSubmit)}>
          <FormField
            name="hasBacklog"
            control={userBacklogForm.control}
            render={({ field }) => (
              <FormItem className="m-4 mt-10 flex items-center justify-between">
                <FormLabel className="text-lg ">
                  Do you have any backlogs?
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Select"}></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          {hasBacklog === "yes" && (
            <div>
              <FormField
                name="activeBacklogs"
                control={userBacklogForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Active Backlogs</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="input-class"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : 0
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="deadBacklogs"
                control={userBacklogForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Dead Backlogs</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="input-class"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : 0
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="totalBacklogs"
                control={userBacklogForm.control}
                render={({ field }) => {
                  // Watch for changes in active and dead backlogs
                  const user_active_backlog =
                    userBacklogForm.watch("activeBacklogs") ?? 0;
                  const user_dead_backlog =
                    userBacklogForm.watch("deadBacklogs") ?? 0;
                  const totalBacklogs = user_active_backlog + user_dead_backlog;

                  return (
                    <FormItem>
                      <FormLabel>Number of Total Backlogs</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="input-class"
                          value={totalBacklogs || field.value || ""}
                          onChange={(e) => {
                            const manualValue = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            field.onChange(manualValue);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
          )}
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
      <Link href={"/onboarding/workauth"}
      className="underline text-gray-600 text-md text-center m-4 flex justify-center font-semibold"
      > {" "} Skip this step
      </Link>
    </div>
  );
};

export default CarryOverForm;
