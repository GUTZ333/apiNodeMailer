import nodemailer from "nodemailer";
import { mailtrapEnvs } from "./zod/env-mailtrap-schema.zod";
import hbs, { type HbsTransporter } from "nodemailer-express-handlebars";
import path from "path";

export const transportMailer: HbsTransporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: mailtrapEnvs.NODEMAILER_PORT,
  auth: {
    user: mailtrapEnvs.NODEMAILER_USER,
    pass: mailtrapEnvs.NODEMAILER_PASS,
  },
});

transportMailer.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".handlebars",
      partialsDir: path.resolve("pages"),
    },
    viewPath: path.resolve("pages"),
    extName: ".handlebars",
  })
);
