import { z } from "zod"
const phoneRegex = /^[0-9]{10}$/;
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

export const skillsFormSchema = z.object({
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

export const personalFormSchema = z.object({
  state:z.string().min(1,{message:"State name should be atleast 1 character long"}),
  country:z.string().min(1,{message:"Country name should be atleast 1 character long"}),
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(phoneRegex, "Phone number must be valid"),
  address:z.string().min(1,{message:"Address should be atleast 1 character long"}),
  dob:z.string()
})
