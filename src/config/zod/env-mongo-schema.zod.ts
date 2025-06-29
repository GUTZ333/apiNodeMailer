import { z } from "zod";

const envMongoSchema = z.object({
  MONGO_URI: z.string().url(),
});

export const mongoEnvs = envMongoSchema.parse(process.env);
