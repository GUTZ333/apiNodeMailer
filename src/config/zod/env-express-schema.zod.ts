import { z } from "zod";
import "dotenv/config";

const envExpressSchema = z.object({
  EXPRESS_PORT: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int())
});

export const expressEnvs = envExpressSchema.parse(process.env);
