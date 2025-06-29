import { z } from "zod";
import "dotenv/config";

const envsMailtrapSchema = z.object({
  NODEMAILER_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int()),
  NODEMAILER_USER: z.string(),
  NODEMAILER_PASS: z.string(),
});

export const mailtrapEnvs = envsMailtrapSchema.parse(process.env);
