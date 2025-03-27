'use client' // is needed only if you’re using React Server Components

import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import { UploadClient } from "@uploadcare/upload-client"
import '@uploadcare/react-uploader/core.css';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { profileFormSchema } from '@/lib/zodSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from 'react-hook-form'
import { string, z } from 'zod'
import { FcGoogle } from "react-icons/fc";
import { Button } from '@/components/ui/button';
import { FaArrowRightLong } from "react-icons/fa6";
import ShinyButton from '@/components/Shiny-button';
import { toast } from 'sonner';
import { onIntegerateUserProfile } from '@/app/actions/onIntegerateUserProfile';

type Props = {}
const uploadClient = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
})
const ProfileForm = (props: Props) => {

    const userProfileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues:{
            firstName:"",
            lastName:"",
            resume:"",
            resumeGoogleDriveLink:""
        }
    })

    const handleSubmit = async(values:z.infer<typeof profileFormSchema>)=>{
        //upload resume to upload care
           const uploadResume = await uploadClient.uploadFile(values.resume)
           if(!uploadResume){
            toast("Couldn't upload resume :(")
           }
           const userName = values.firstName+" "+ values.lastName
           //add name and resume to db
           const onAddUserProfileToDB = await onIntegerateUserProfile({
            name: userName,
            firstName: values.firstName,
            lastName: values.lastName,
            resume_uploadcare_uuid: uploadResume.uuid,
            resume_google_drive_link: values.resumeGoogleDriveLink
          });
    }
  return (
    <div>
       <Form {...userProfileForm}>
        <form>
            <FormField
            control={userProfileForm.control}
            name='firstName'
            render={({ field })=>(
                <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                    <Input placeholder='enter your first name' {...field}></Input>
                    </FormControl>
                </FormItem>
  )}>
            </FormField>
            <FormField
            control={userProfileForm.control}
            name='lastName'
            render={({ field })=>(
                <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <Input placeholder='enter your last name' {...field}/>
                    </FormControl>
                </FormItem>
            )}>
                
            </FormField>

            <FormField
            control={userProfileForm.control}
            name='resume'
            render={({ field })=>(
                <FormItem>
                    <FormLabel>Upload your <span className='text-brand-500'>Resume</span></FormLabel>
                <FormControl>
                <FileUploaderRegular
          sourceList="local, gdrive"
          classNameUploader="uc-light"
          pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || "default_pub_key"}
          accept="application/pdf"
          data-max-size="5242880" // 5MB limit (in bytes)
          {...field}
        />
             </FormControl>
                </FormItem>
            )}>
            </FormField>

            <FormField
            control={userProfileForm.control}
            name={"resumeGoogleDriveLink"}
            render={({ field })=>(
                <FormItem>
                    <FormLabel>Upload a <FcGoogle /> google drive link four your resume</FormLabel>
                <FormControl>
<Input placeholder='paste drive link here' {...field}></Input>
                </FormControl>
                </FormItem>  
            )}>

            </FormField>

            <ShinyButton type='submit'>Get Started <FaArrowRightLong /></ShinyButton>
        </form>
        
       </Form>

    </div>
  )
}

export default ProfileForm