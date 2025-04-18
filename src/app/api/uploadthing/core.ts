import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    resumeUploader: f({
        pdf: { maxFileSize: "4MB", maxFileCount: 1, minFileCount: 1 },
      })
    .middleware(async () => {
      const user = await currentUser()
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { 
        uploadedBy: metadata.userId,
        fileUrl:file.ufsUrl
       };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
