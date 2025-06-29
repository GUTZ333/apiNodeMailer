import Agenda, { Job } from "agenda";
import { mongoEnvs } from "./zod/env-mongo-schema.zod";
import { Options } from "nodemailer/lib/mailer";
import { transportMailer } from "./node-mailer.config";
import { googleEnv as googleEnv } from "./zod/env-google-schema.zod";

export const agenda = new Agenda({
  db: {
    address: mongoEnvs.MONGO_URI,
  },
});

agenda.define("send-mail", async (job: Job<Options>) => {
  const { to, subject, html, text } = job.attrs.data;

  await transportMailer.sendMail({
    from: googleEnv.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  });
});

await agenda.start();
