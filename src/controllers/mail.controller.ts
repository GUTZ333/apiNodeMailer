import { Request, Response } from "express";
import mailServices from "../services/mail.services";
import Mail from "nodemailer/lib/mailer";
import { sendTemplateMailOptions } from "../types/send-mail-options.type";
import { IScheduleEmail } from "../types/schedule-mail.type";
import { parse } from "date-fns";

export default {
  async sendEmailController(req: Request, res: Response) {
    try {
      const body: Mail.Options = req.body;

      if (!body.to || !body.subject || (!body.text && !body.html)) {
        res.status(400).send({ message: "Dados de e-mail incompletos." });
      }
      const sendingEmail = await mailServices.sendEmailService(body);
      if (sendingEmail) {
        res.status(201).send({ message: "E-mail enviado com sucesso!!" });
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        res
          .status(500)
          .send({ message: "Ocorreu um erro interno", error: err.message });
    }
  },

  async sendHtmlTemplateController(req: Request, res: Response) {
    try {
      const body: sendTemplateMailOptions = req.body;

      if (
        !body.to ||
        !body.subject ||
        (!body.text && !body.html) ||
        !body.template
      ) {
        res
          .status(400)
          .send({ message: "dados de e-mail e interfaces incompleto." });
      }
      const sendingHtmlTemplate = await mailServices.sendHtmlTemplateService(
        body
      );
      if (sendingHtmlTemplate) {
        res.status(201).send({ message: "template enviado com sucesso!!" });
      }
    } catch (err: unknown) {
      if (err instanceof Error) res.status(500).send({ error: err.message });
    }
  },

  async sendAttachmentsController(req: Request, res: Response) {
    try {
      const body: Mail.Options = req.body;
      if (
        !body.to ||
        !body.subject ||
        (!body.text && !body.html) ||
        !body.attachments
      ) {
        res
          .status(400)
          .send({ message: "dados de e-mail e anexos incompletos." });
      }
      const sendingAttachments = await mailServices.sendAttachmentService(body);
      if (sendingAttachments) {
        res.status(201).send({ message: "anexo enviado com sucesso" });
      }
    } catch (err: unknown) {
      if (err instanceof Error) res.status(500).send({ error: err.message });
    }
  },

  async scheduleMailController(req: Request, res: Response) {
    try {
      const body: IScheduleEmail = req.body;

      if (!body.to || !body.subject || !body.date || !body.time) {
        res
          .status(400)
          .send({ message: "dados de agendamento de e-mail incompletos." });
      }

      const scheduleDate = parse(
        `${body.date} ${body.time}`,
        "yyyy-MM-dd HH:mm",
        new Date()
      );
      if (scheduleDate.getTime() < Date.now()) {
        res
          .status(400)
          .send({ message: "A data e hora não pode estar no passado" });
      }

      const scheduleMail = await mailServices.scheduleMailService(
        body,
        scheduleDate
      );
      if (scheduleMail) {
        const dateTimeFormated = scheduleDate.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        res.status(201).send({
          message: `email agendado as ${dateTimeFormated} com sucesso!!`,
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) res.status(500).send({ error: err.message });
    }
  },
};
