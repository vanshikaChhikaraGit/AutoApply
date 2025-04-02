import { z } from "zod"

export const profileFormSchema = z.object({
    firstName: z.string().min(3, { message: "First name should be at least 3 characters long." }),
    lastName: z.string().min(3, { message: "Last name should be at least 3 characters long." }),
    resume: z.string(), // This will store the Uploadcare UUID
    resumeGoogleDriveLink: z.string().url(),
});

export const educationFormSchema = z.object({
  universityName: z.string({message:"Name of university is required."}).min(2, { message: "University name should be at least 2 characters long." }),
  degree: z.string({message:"Degree is required."}).min(2, { message: "Degree name should be at least 2 characters long." }),
  major: z.string({message:"Major is required."}).min(2, { message: "Major should be at least 2 characters long." }),
  cgpa: z.number({message:"CGPA is required."}).min(0).max(11),
  enrollmentNo: z.string().nullable(),
  currentYearOfStudy:z.string({message: "Please enter current year of study"}),
  currentSemester:z.string({message: "Please enter current semester"}),

  startMonth: z.coerce.number({message:"Starting month is required."}).min(1).max(12), 
  startYear: z.coerce.number({message:"Starting year is required."}).min(1900).max(new Date().getFullYear()), 
  endMonth: z.coerce.number({message:"Ending month is required."}).min(1).max(12),
  endYear: z.coerce.number({message:"Ending year is required."}).min(1900)
});

export const carryOverFormSchema = z.object({
  hasBacklog : z.string({message:"This field is required."}),
  activeBacklogs: z.number().min(0).nullable(),
  deadBacklogs: z.number().min(0).nullable(),
  totalBacklogs: z.number().min(0).nullable()
})

export const workAuthFormSchema = z.object({
  is_authorized_to_work : z.string({message:"This field is required."}),
  require_visa_sponsorship:z.string({message:"This field is required."})
})

export const eeoFormSchema = z.object({
  ethnicity: z.string(), 
  disability: z.enum(["Yes", "No", "Prefer Not To Say"]),
  lgbtq: z.enum(["Yes", "No", "Prefer Not To Say"]),
  gender: z.enum(["Male", "Female", "Non-Binary", "Prefer Not To Say"]),
});
