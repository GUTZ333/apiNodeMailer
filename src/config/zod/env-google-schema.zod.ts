import { z } from "zod";
import "dotenv/config";

const envGoogleSchema = z.object({
  GOOGLE_USER: z.string(),
});

export const googleEnv = envGoogleSchema.parse(process.env);
