import { Request, Response } from "express";

export default {
  sayHelloToExpress(req: Request, res: Response) {
    res.status(200).send({ message: "Hello Express!!" });
  },
  sayHelloToNodemailer(req: Request, res: Response) {
    res.status(200).send({ message: "Hello NodeMailer!!" });
  },
};
  