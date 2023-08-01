import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as admin from "firebase-admin";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      if (!admin.apps[0]) {
        await admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          }),
        });
      }
      const authAdmin = admin.auth();
      const email = process.env.NEXT_PUBLIC_EXAMPLE_EMAIL || "";
      // const link = await authAdmin.generateEmailVerificationLink(email);
      // console.log("link", link);
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
