import { Router } from "express";
import mailController from "../controllers/mail.controller";
import { uploads } from "../middleware/mutterdeded.middleware";

export const mailRouters = Router();

mailRouters.post("/send", mailController.sendEmailController);
mailRouters.post("/send-template", mailController.sendHtmlTemplateController);
mailRouters.post(
  "/send-attachments",  
  uploads.single("attachments"),
  mailController.sendAttachmentsController
);
mailRouters.post("/schedule", mailController.scheduleMailController);
