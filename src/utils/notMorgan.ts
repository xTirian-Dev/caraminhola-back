import { NextFunction, Request, RequestHandler, Response } from "express";
import chalk from "chalk";
import onFinished from "on-finished";

export const notMorgan: RequestHandler = (req, res, next) => {
  const start = Date.now();
  const method = req.method;
  const url = req.originalUrl;

  let styledMethod: string;
  switch (method) {
    case "GET":
      styledMethod = chalk.green(method);
      break;
    case "POST":
      styledMethod = chalk.yellow(method);
      break;
    case "PUT":
      styledMethod = chalk.blue(method);
      break;
    case "DELETE":
      styledMethod = chalk.red(method);
      break;
    default:
      styledMethod = chalk.gray(method);
  }

  onFinished(res, () => {
    const ms = Date.now() - start;
    const status = res.statusCode;
    let styledStatus;

    if (status >= 200 && status < 300) {
      styledStatus = chalk.green(status);
    } else if (status >= 300 && status < 400) {
      styledStatus = chalk.blue(status);
    } else if (status >= 400 && status < 500) {
      styledStatus = chalk.yellow(status);
    } else if (status >= 500) {
      styledStatus = chalk.red(status);
    } else {
      styledStatus = chalk.gray(status);
    }

    let styledTime = ms > 200 ? chalk.red(ms) : chalk.green(ms);

    console.log(styledMethod);

    console.log(
      `${styledMethod} ${url} ${styledStatus} ${styledTime}ms - ${res.statusMessage}`
    );
  });

  next();
};
