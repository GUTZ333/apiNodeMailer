import Mail from "nodemailer/lib/mailer";
import { transportMailer } from "../config/node-mailer.config";
import { googleEnv } from "../config/zod/env-google-schema.zod";
import { type sendTemplateMailOptions } from "../types/send-mail-options.type";
import { IScheduleEmail } from "../types/schedule-mail.type";
import { agenda } from "../config/agenda.config";

export default {
  async sendEmailService(body: Mail.Options) {
    const { to, subject, html, text } = body;
    const emailSending = await transportMailer.sendMail({
      from: googleEnv.GOOGLE_USER,
      to,
      subject,
      html,
      text,
    });
    return emailSending;
  },

  async sendHtmlTemplateService(body: sendTemplateMailOptions) {
    const { to, subject, text, template, context } = body;

    const emailSending = await transportMailer.sendMail({
      from: googleEnv.GOOGLE_USER,
      to,
      subject,
      text,
      context,
      template,
    });
    return emailSending;
  },

  async sendAttachmentService(body: Mail.Options) {
    const { to, subject, html, text, attachments } = body;

    const sendingAttachments = await transportMailer.sendMail({
      from: googleEnv.GOOGLE_USER,
      to,
      subject,
      html,
      text,
      attachments,
    });
    return sendingAttachments;
  },

  async scheduleMailService(body: IScheduleEmail, scheduleDate: Date) {
    const { to, subject, text, html } = body;

    const schedulingMail = await agenda.schedule(scheduleDate, "send-mail", {
      from: googleEnv.GOOGLE_USER,
      to,
      subject,
      html:
        html ??
        `<h1>este e-mail foi agendado a ser enviado em <strong>${scheduleDate}</strong></h1>`,
      text,
    });

    return schedulingMail;
  },
};
