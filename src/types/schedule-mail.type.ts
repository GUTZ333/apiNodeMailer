import { type Options } from "nodemailer/lib/mailer";

export interface IScheduleEmail extends Options {
  date: string;
  time: string;
}