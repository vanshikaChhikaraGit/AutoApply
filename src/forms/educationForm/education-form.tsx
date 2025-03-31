"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { educationFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { onIntegerateEducationToDB } from "@/app/actions/education/addEducationInfoToDB";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Props = {};

// university name, degree, major, gpa, start mont,year and end month,year of degree
const EducationForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const userEducationForm = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      universityName: "",
      cgpa: 0,
      startMonth: 0,
      startYear: 0,
      endMonth: 0,
      endYear: 0,
      degree: "",
      major: "",
      enrollmentNo: "",
      currentYearOfStudy: "",
      currentSemester: "",
    },
  });

  const onHandleSubmit = async (
    values: z.infer<typeof educationFormSchema>
  ) => {
    try {
      setLoading(true);
      const integrateToDB = await onIntegerateEducationToDB({
        universityName: values.universityName,
        major: values.major,
        degree: values.degree,
        cgpa: values.cgpa,
        enrollmentNo: values.enrollmentNo,
        startMonth: values.startMonth,
        startYear: values.startYear,
        endMonth: values.endMonth,
        endYear: values.endYear,
        currentYearOfStudy: values.currentYearOfStudy,
        currentSem: values.currentSemester,
      });

      if (integrateToDB) {
        if (integrateToDB.status === 200) {
          toast("Success 🎉", {
            description: (
              <span className="text-sm text-black">
                {integrateToDB.message}
              </span>
            ),
          });
          setLoading(false);
          // Redirect to the next page after success
          router.push("/onboarding/carryover");
        } else {
          setLoading(false);
          toast("Error 😭", {
            description: (
              <span className="text-sm text-black">
                {integrateToDB.message}
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
      <Form {...userEducationForm}>
        <form onSubmit={userEducationForm.handleSubmit(onHandleSubmit)}>
          {/* university name  */}
          <FormField
            control={userEducationForm.control}
            name="universityName"
            render={({ field }) => (
              <FormItem className="m-4">
                <FormLabel>University Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter full name of your instituition (avoid abbreviations)"
                    {...field}
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex">
              {/* degree  */}
              <FormField
                control={userEducationForm.control}
                name="degree"
                render={({ field }) => (
                  <FormItem className="m-4 hover:cursor-pointer">
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value ?? undefined}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="hover:cursor-pointer">
                          <SelectValue placeholder="Select your degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Bachelor's"
                          >
                            Bachelor's
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              {/* major  */}
              <FormField
                control={userEducationForm.control}
                name="major"
                render={({ field }) => (
                  <FormItem className="m-4">
                    <FormLabel>Major</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value ?? undefined}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="hover:cursor-pointer">
                          <SelectValue placeholder="Select your major" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Computer science and engineering (CSE)"
                          >
                            Computer Science and Engineering (CSE)
                          </SelectItem>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Computer science and engineering with Artificial Intelligence (CSEAI)"
                          >
                            Computer Science and Engineering with Artificial
                            Intelligence (CSEAI)
                          </SelectItem>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Electronics and Communication Engineering (ECE)"
                          >
                            Electronics and Communication Engineering (ECE)
                          </SelectItem>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Electronics and Communication Engineering with Artificial Intelligence (ECEAI)"
                          >
                            Electronics and Communication Engineering with
                            Artificial Intelligence (ECEAI)
                          </SelectItem>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Information Technology (IT)"
                          >
                            Information Technology (IT)
                          </SelectItem>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Artificial Intelligence and Machine Learning (AI/ML)"
                          >
                            Artificial Intelligence and Machine Learning (AI/ML)
                          </SelectItem>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Mechanical and Automation Engineering (MAE)"
                          >
                            Mechanical and Automation Engineering (MAE)
                          </SelectItem>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Electrical Engineering (EE)"
                          >
                            Electrical Engineering (EE)
                          </SelectItem>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Civil Engineering"
                          >
                            Civil Engineering
                          </SelectItem>
                          <SelectItem
                            className="hover:cursor-pointer"
                            value="Chemical Engineering"
                          >
                            Chemical Engineering
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className="flex">
              {/* enrollmentNo */}
              <FormField
                control={userEducationForm.control}
                name="enrollmentNo"
                render={({ field }) => (
                  <FormItem className="m-4">
                    <FormLabel>Enrollment No</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enrollment number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      ></Input>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              {/* cgpa  */}
              <FormField
                control={userEducationForm.control}
                name="cgpa"
                render={({ field }) => (
                  <FormItem className="m-4">
                    <FormLabel>GPA</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01" // Allows decimals
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Current GPA"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : parseFloat(value)); // Convert to float if not empty
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Start Month */}
            <FormField
              control={userEducationForm.control}
              name="startMonth"
              render={({ field }) => (
                <FormItem className="m-4">
                  <FormLabel>Start Month</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="hover:cursor-pointer">
                        {field.value ? (
                          field.value
                        ) : (
                          <p className="text-xs text-gray-700">start month</p>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month, index) => (
                          <SelectItem
                            className="hover:cursor-pointer"
                            key={index}
                            value={(index + 1).toString()}
                          >
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Start Year */}
            <FormField
              control={userEducationForm.control}
              name="startYear"
              render={({ field }) => (
                <FormItem className="m-4">
                  <FormLabel>Start Year</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="hover:cursor-pointer">
                        {field.value ? (
                          field.value
                        ) : (
                          <p className="text-xs text-gray-700">start year</p>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: new Date().getFullYear() - 2000 + 1 },
                          (_, i) => (
                            <SelectItem
                              key={i}
                              value={(2000 + i).toString()}
                              className="hover:cursor-pointer"
                            >
                              {2000 + i}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* End Month */}
            <FormField
              control={userEducationForm.control}
              name="endMonth"
              render={({ field }) => (
                <FormItem className="m-4">
                  <FormLabel>End Month</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="hover:cursor-pointer">
                        {field.value ? (
                          field.value
                        ) : (
                          <p className="text-xs text-gray-700">end month</p>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month, index) => (
                          <SelectItem
                            className="hover:cursor-pointer"
                            key={index}
                            value={(index + 1).toString()}
                          >
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* End Year */}
            {/* Auto-Fill End Year on Start Year Change */}
            {(() => {
              const startYear = userEducationForm.watch("startYear");
              const minEndYear = startYear ? startYear + 4 : 2004; // Default minEndYear
              const currentYear = new Date().getFullYear();

              useEffect(() => {
                if (startYear) {
                  // Ensure endYear is within valid range
                  const newEndYear = Math.max(minEndYear, 2004);
                  userEducationForm.setValue("endYear", newEndYear);
                }
              }, [startYear, userEducationForm]);

              return (
                <FormField
                  control={userEducationForm.control}
                  name="endYear"
                  render={({ field }) => (
                    <FormItem className="m-4">
                      <FormLabel>End Year</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                        >
                          <SelectTrigger className="hover:cursor-pointer">
                            {field.value ? (
                              field.value
                            ) : (
                              <p className="text-xs text-gray-700">End Year</p>
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(
                              {
                                length: Math.max(
                                  currentYear - minEndYear + 1,
                                  1
                                ),
                              },
                              (_, i) => (
                                <SelectItem
                                  key={i}
                                  value={(minEndYear + i).toString()}
                                  className="hover:cursor-pointer"
                                >
                                  {minEndYear + i}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              );
            })()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current Semester */}
            <FormField
              control={userEducationForm.control}
              name="currentSemester"
              render={({ field }) => (
                <FormItem className="m-4">
                  <FormLabel>Current Semester</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={String(field.value)}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="hover:cursor-pointer">
                        <SelectValue placeholder="current sem" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "First (01)",
                          "Second (02)",
                          "Third (03)",
                          "Fourth (04)",
                          "Fifth (05)",
                          "Sixth (06)",
                          "Seventh (07)",
                          "Eighth (08)",
                        ].map((sem, index) => (
                          <SelectItem
                            key={index}
                            value={sem}
                            className="hover:cursor-pointer"
                          >
                            {sem.split(" (")[0]} Semester
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Current Year of Study */}
            <FormField
              control={userEducationForm.control}
              name="currentYearOfStudy"
              render={({ field }) => (
                <FormItem className="m-4">
                  <FormLabel>Current Year Of Study</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={String(field.value)}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="hover:cursor-pointer">
                        <SelectValue placeholder="current uni year" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "First (01)",
                          "Second (02)",
                          "Third (03)",
                          "Fourth (04)",
                        ].map((year, index) => (
                          <SelectItem
                            key={index}
                            value={year}
                            className="hover:cursor-pointer"
                          >
                            {year.split(" (")[0]} Year
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

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
              href={"/onboarding/carryover"}
              className="underline text-gray-600 text-md text-center m-4 flex justify-center font-semibold"
            >
              {" "}
              Skip this step
            </Link>
    </div>
  );
};

export default EducationForm;
