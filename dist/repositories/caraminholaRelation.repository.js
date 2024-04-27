"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.caraminholaRelationReposirory = void 0;
const prismaConfig_1 = __importDefault(require("../utils/prismaConfig"));
class caraminholaRelationReposirory {
    constructor() {
        this.findFirst = prismaConfig_1.default.caraminhola_Relation.findFirst;
        this.findMany = prismaConfig_1.default.caraminhola_Relation.findMany;
    }
}
exports.caraminholaRelationReposirory = caraminholaRelationReposirory;
