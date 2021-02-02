import morgan from "morgan";
import path from "path";

import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import "express-async-errors";

import BaseRouter from "./routes";
import Logger from "jet-logger";

const logger = new Logger();
const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Add APIs
app.use("/api", BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message
  });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));
app.get("*", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: staticDir });
});

// Export express instance
export default app;
