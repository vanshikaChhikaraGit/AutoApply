import { z } from "zod"

export const profileFormSchema = z.object({
    firstName: z.string().min(3, { message: "First name should be at least 3 characters long." }),
    lastName: z.string().min(3, { message: "Last name should be at least 3 characters long." }),
    resume: z.string(), // This will store the Uploadcare UUID
    resumeGoogleDriveLink: z.string().url(),
});
