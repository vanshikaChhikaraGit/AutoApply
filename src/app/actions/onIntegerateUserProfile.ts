"use server"

type inputArgs ={
name:string,
firstName:string,
lastName:string,
resume_uploadcare_uuid:string,
resume_google_drive_link:string
}

export const onIntegerateUserProfile = async({name,firstName,lastName,resume_uploadcare_uuid,resume_google_drive_link}:inputArgs)=>{

    //find user
    //add their details in user and resume model

    
}