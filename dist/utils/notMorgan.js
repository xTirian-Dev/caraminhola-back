"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notMorgan = void 0;
const chalk_1 = __importDefault(require("chalk"));
const on_finished_1 = __importDefault(require("on-finished"));
const notMorgan = (req, res, next) => {
    const start = Date.now();
    const method = req.method;
    const url = req.originalUrl;
    let styledMethod;
    switch (method) {
        case "GET":
            styledMethod = chalk_1.default.green(method);
            break;
        case "POST":
            styledMethod = chalk_1.default.yellow(method);
            break;
        case "PUT":
            styledMethod = chalk_1.default.blue(method);
            break;
        case "DELETE":
            styledMethod = chalk_1.default.red(method);
            break;
        default:
            styledMethod = chalk_1.default.gray(method);
    }
    (0, on_finished_1.default)(res, () => {
        const ms = Date.now() - start;
        const status = res.statusCode;
        let styledStatus;
        if (status >= 200 && status < 300) {
            styledStatus = chalk_1.default.green(status);
        }
        else if (status >= 300 && status < 400) {
            styledStatus = chalk_1.default.blue(status);
        }
        else if (status >= 400 && status < 500) {
            styledStatus = chalk_1.default.yellow(status);
        }
        else if (status >= 500) {
            styledStatus = chalk_1.default.red(status);
        }
        else {
            styledStatus = chalk_1.default.gray(status);
        }
        let styledTime = ms > 200 ? chalk_1.default.red(ms) : chalk_1.default.green(ms);
        console.log(styledMethod);
        console.log(`${styledMethod} ${url} ${styledStatus} ${styledTime}ms - ${res.statusMessage}`);
    });
    next();
};
exports.notMorgan = notMorgan;
