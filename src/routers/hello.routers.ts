import { Router } from "express";
import helloController from "../controllers/hello.controller";

export const helloRouter = Router();

helloRouter.get("/hello-express", helloController.sayHelloToExpress);
helloRouter.get("/hello-nodemailer", helloController.sayHelloToNodemailer);
