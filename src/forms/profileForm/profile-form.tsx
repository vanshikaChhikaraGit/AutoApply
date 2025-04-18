"use client"; // is needed only if you’re using React Server Components

import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import { UploadClient } from "@uploadcare/upload-client";
import "@uploadcare/react-uploader/core.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import ShinyButton from "@/components/Shiny-button";
import { toast } from "sonner";
import { onIntegerateUserProfile } from "@/app/actions/onIntegerateUserProfile";
import { IoCloudUpload } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoadingSpinner } from "@/components/loading-spinner";
import { UploadButton } from "@/utils/uploadthing";
import { ArrowUpNarrowWide, Check, CloudUpload } from "lucide-react";

type Props = {};
const uploadClient = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});
const ProfileForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();
  const userProfileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      resume: "",
      resumeGoogleDriveLink: "",
    },
  });

  const onHandleSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    try {
      setLoading(true);

      const userName = values.firstName + " " + values.lastName;

      // Add user details and resume to DB
      const onAddUserProfileToDB = await onIntegerateUserProfile({
        name: userName,
        firstName: values.firstName,
        lastName: values.lastName,
        resume_uploadcare_uuid: values.resume,
        resume_google_drive_link: values.resumeGoogleDriveLink,
      });

      if (onAddUserProfileToDB) {
        if (onAddUserProfileToDB.status === 200) {
          toast("Success 🎉", {
            description: (
              <span className="text-sm text-black">
                {onAddUserProfileToDB.message}
              </span>
            ),
          });
          setLoading(false);
          // Redirect to the next page after success
          router.push("/onboarding/education");
        } else {
          setLoading(false);
          toast("Error 😭", {
            description: (
              <span className="text-sm text-black">
                {onAddUserProfileToDB.message}
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
      <Form {...userProfileForm}>
        <form onSubmit={userProfileForm.handleSubmit(onHandleSubmit)}>
          {/* first name  */}
          <FormField
            control={userProfileForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="m-4">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="enter your first name" {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* last name  */}
          <FormField
            control={userProfileForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="m-4">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="enter your last name" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* upload resume pdf */}
          <FormField
            control={userProfileForm.control}
            name="resume"
            render={({ field }) => (
              <FormItem className="m-4">
                <FormLabel>
                  Upload your
                  <span className="text-brand-500 font-semibold text-lg">
                    Resume
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center justify-center w-full border-2 border-gray-500 border-dotted p-4 rounded-lg">
                    {/* Upload Icon */}
                    <MdAddPhotoAlternate
                      size={35}
                      className="text-brand-500"
                    ></MdAddPhotoAlternate>
                    <p className="text-gray-500 text-xs mb-5">
                      PDF file upto 5 MB.{" "}
                    </p>
                    {/* uploadthing Uploader */}
                    <label className="cursor-pointer">
                      <span className="flex items-center px-4 py-2 bg-gray-200/40 text-black/80 text-xs rounded-md hover:bg-brand-300 transition">
                        {uploaded ? (
                          <>
                            Uploaded <Check />
                          </>
                        ) : (
                          <>
                            Upload Resume{" "}
                            <CloudUpload size={15} className="ml-1" />
                          </>
                        )}
                      </span>
                      <UploadButton
                        endpoint="resumeUploader"
                        className="hidden" // hide UploadThing's default styles
                        onClientUploadComplete={(res) => {
                          const file = res[0];
                          field.value = file.ufsUrl;
                          setUploaded(true);
                          toast.success("File upload successful");
                        }}
                        onUploadError={(error: Error) => {
                          toast.error("Couldn't upload resume :(");
                        }}
                      />
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* upload resume drive link  */}
          <FormField
            control={userProfileForm.control}
            name={"resumeGoogleDriveLink"}
            render={({ field }) => (
              <FormItem className="m-4">
                <FormLabel>
                  Upload a <FcGoogle className="mr-0" size={20} /> drive link
                  for your resume
                </FormLabel>
                <FormControl>
                  <Input placeholder="paste drive link here" {...field}></Input>
                </FormControl>
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
                Uploading <LoadingSpinner></LoadingSpinner>{" "}
              </>
            ) : (
              <>
                Get Started <FaArrowRightLong></FaArrowRightLong>{" "}
              </>
            )}
          </Button>
        </form>
      </Form>
      <Link
        href={"/onboarding/education"}
        className="underline text-gray-600 text-md text-center m-4 flex justify-center font-semibold"
      >
        {" "}
        Skip this step
      </Link>
    </div>
  );
};

export default ProfileForm;
