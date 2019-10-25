import { NextFunction } from "connect";
import cookieParser from "cookie-parser";
import Debug from "debug";
import express, { Request, Response } from "express";
import http from "http";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import HttpException from "./exceptions/HttpException";
import indexRouter from "./routes/index";

const app = express();
const debug = Debug("expgts:server");

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
