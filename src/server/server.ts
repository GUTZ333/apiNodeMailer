import { app } from "@app/app";
import { expressEnvs } from "../config/zod/env-express-schema.zod";
import express from "express";
import cors from "cors";
import { helloRouter } from "../routers/hello.routers";
import { mailRouters } from "../routers/mail.routers";

const PREFIX_ROUTE = "/api";

app.use(express.json());
app.use(cors());
app.use(PREFIX_ROUTE, helloRouter);
app.use(`${PREFIX_ROUTE}/mail`, mailRouters);

app.listen(expressEnvs.EXPRESS_PORT, () => {
  console.log(`HTTP server running in port ${expressEnvs.EXPRESS_PORT}`);
});
