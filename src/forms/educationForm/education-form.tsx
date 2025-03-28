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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

// university name, degree, major, gpa, start mont,year and end month,year of degree
const EducationForm = (props: Props) => {
  const [loading, setLoading] = useState(false);

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
    },
  });

  const onHandleSubmit = async (
    values: z.infer<typeof educationFormSchema>
  ) => {};
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
                    placeholder="enter your instituition name"
                    {...field}
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* degree  */}
       <FormField
            control={userEducationForm.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bachelor's"></SelectItem>
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
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your major" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer science and engineering (CSE)">
                        Computer Science and Engineering (CSE)
                      </SelectItem>
                      <SelectItem value="Computer science and engineering with Artificial Intelligence (CSEAI)">
                        Computer Science and Engineering with Artificial
                        Intelligence (CSEAI)
                      </SelectItem>
                      <SelectItem value="Electronics and Communication Engineering (ECE)">
                        Electronics and Communication Engineering (ECE)
                      </SelectItem>
                      <SelectItem value="Electronics and Communication Engineering with Artificial Intelligence (ECEAI)">
                        Electronics and Communication Engineering with
                        Artificial Intelligence (ECEAI)
                      </SelectItem>
                      <SelectItem value="Information Technology (IT)">
                        Information Technology (IT)
                      </SelectItem>
                      <SelectItem value="Artificial Intelligence and Machine Learning (AI/ML)">
                        Artificial Intelligence and Machine Learning (AI/ML)
                      </SelectItem>
                      <SelectItem value="Mechanical and Automation Engineering (MAE)">
                        Mechanical and Automation Engineering (MAE)
                      </SelectItem>
                      <SelectItem value="Electrical Engineering (EE)">
                        Electrical Engineering (EE)
                      </SelectItem>
                      <SelectItem value="Civil Engineering">
                        Civil Engineering
                      </SelectItem>
                      <SelectItem value="Chemical Engineering">
                        Chemical Engineering
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* enrollmentNo */}
<FormField
            control={userEducationForm.control}
            name="enrollmentNo"
            render={({ field }) => (
              <FormItem className="m-4">
                <FormLabel>Enrollment No</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your enrollment number"
                    value={field.value ?? ""}
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
                    type={"number"}
                    {...field}
                    value={field.value ?? ""}
                    placeholder="your current gpa"
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* start month  */}
          <FormField
            control={userEducationForm.control}
            name="startMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Month</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select start month of  your degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* start year  */}
          <FormField
            control={userEducationForm.control}
            name="startYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Year</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select start month of  your degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: new Date().getFullYear() - 2000 + 1 },
                        (_, i) => (
                          <SelectItem key={i} value={(2000 + i).toString()}>
                            {2000 + i}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* end month  */}
          <FormField
            control={userEducationForm.control}
            name="endMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Month</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select end month of  your degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* end year  */}
          <FormField
            control={userEducationForm.control}
            name="endYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Year</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select start month of  your degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: new Date().getFullYear() - field.value + 1 },
                        (_, i) => (
                          <SelectItem
                            key={i}
                            value={(field.value + i).toString()}
                          >
                            {field.value + i}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        </form>
      </Form>
    </div>
  );
};

export default EducationForm;
