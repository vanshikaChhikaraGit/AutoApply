import { z } from "zod"

export const profileFormSchema = z.object({
    firstName: z.string().min(3, { message: "First name should be at least 3 characters long." }),
    lastName: z.string().min(3, { message: "Last name should be at least 3 characters long." }),
    resume: z.string(), // This will store the Uploadcare UUID
    resumeGoogleDriveLink: z.string().url(),
});

export const educationFormSchema = z.object({
  universityName: z.string().min(2, { message: "University name should be at least 2 characters long." }),
  degree: z.string().min(2, { message: "Degree name should be at least 2 characters long." }),
  major: z.string().min(2, { message: "Major should be at least 2 characters long." }),
  cgpa: z.number().min(0).max(10),
  enrollmentNo: z.string().nullable(),

  startMonth: z.coerce.number().min(1).max(12), 
  startYear: z.coerce.number().min(1900).max(new Date().getFullYear()), 
  endMonth: z.coerce.number().min(1).max(12),
  endYear: z.coerce.number().min(1900).max(new Date().getFullYear())
});

