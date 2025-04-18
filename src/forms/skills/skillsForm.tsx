"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
} from "@/components/ui/select";
import { skillsFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { softwareEngineerSkills } from "@/constants/constants";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { LoadingSpinner } from "@/components/loading-spinner";
import Link from "next/link";
import { onIntegrateSkillsToDB } from "@/app/actions/skills/addSkillsToDB";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type Props = {};

const SkillsForm = (props: Props) => {
    const [loading,setLoading] = useState(false)
    const router = useRouter()
  const userSkillsForm = useForm<z.infer<typeof skillsFormSchema>>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: {
      skills: [],
    },
  });

  const onHandleSubmit = async (values: z.infer<typeof skillsFormSchema>) => {
    try {
        setLoading(true)
        const addUserSkillsInfoToDB = await onIntegrateSkillsToDB({
            skills:values.skills
        })
        if(addUserSkillsInfoToDB){
            if(addUserSkillsInfoToDB.status===200){
                toast("Success 🎉", {
                    description: (
                      <span className="text-sm text-black">
                        {addUserSkillsInfoToDB.message}
                      </span>
                    ),
                  });
                  setLoading(false)
                  router.push('/onboarding/personal')
            }else{
                toast("Error😭", {
                    description: (
                      <span className="text-sm text-black">
                        {addUserSkillsInfoToDB.message}
                      </span>
                    ),
                  });
                  setLoading(false)
            }
        }
    } catch (error) {
        
    }
  };
  const selectedSkills = userSkillsForm.watch("skills") || [];
  const handleSkillChange = (skill: string) => {
    const prevSkills = userSkillsForm.getValues("skills") || [];

    const updatedSkills = prevSkills.includes(skill)
      ? prevSkills.filter((s) => s !== skill)
      : [...prevSkills, skill];

    userSkillsForm.setValue("skills", updatedSkills, { shouldValidate: true });
  };
  return (
    <div>
      <Form {...userSkillsForm}>
        <form onSubmit={userSkillsForm.handleSubmit(onHandleSubmit)}>
          <FormField
            name="skills"
            control={userSkillsForm.control}
            render={({ field }) => (
              <FormItem className="flex items-center justify-between m-4 mt-10">
                <FormLabel className="text-xl">Skills</FormLabel>
                <FormControl>
                  <div>
                    <Select value="" onValueChange={handleSkillChange}>
                      <SelectTrigger className="hover:cursor-pointer">
                        <SelectValue placeholder={"Select"}></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {softwareEngineerSkills.map((skill, index) => (
                          <SelectItem
                            key={index}
                            className="hover:cursor-pointer"
                            value={skill}
                          >
                            {selectedSkills.includes(skill)? <p className="flex items-center justify-center bg-gray-200/40 w-full border rounded-md p-1 border-none">{skill}<Check className="size-4 ml-2"/></p>:skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          {selectedSkills.length > 0 ? (
        <div className="flex items-center flex-wrap justify-center m-2">
          {selectedSkills.map((selectedSkill, index) => (
            <span
              className="bg-brand-300 text-white font-medium text-sm m-1 border rounded-lg p-2"
              key={index}
            >
              {selectedSkill}
            </span>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-sm flex items-center justify-between text-center">no skill selected</div>
      )}
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
      <Link href={"/onboarding/personal"}
            className="underline text-gray-600 text-md text-center m-4 flex justify-center font-semibold"
            > {" "} Skip this step
            </Link>
    </div>
  );
};

export default SkillsForm;
