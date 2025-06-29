import { type HbsTransporter } from "nodemailer-express-handlebars";

export type sendTemplateMailOptions = Parameters<HbsTransporter["sendMail"]>[0];
