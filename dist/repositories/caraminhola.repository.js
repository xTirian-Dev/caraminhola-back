"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.caraminholaRepository = void 0;
const prismaConfig_1 = __importDefault(require("../utils/prismaConfig"));
class caraminholaRepository {
    constructor() {
        this.findFirst = prismaConfig_1.default.caraminhola.findFirst;
        this.findMany = prismaConfig_1.default.caraminhola.findMany;
        this.create = prismaConfig_1.default.caraminhola.create;
    }
    getCaraminhola(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaConfig_1.default.caraminhola.findUnique({
                where: { id },
                select: {
                    id: true,
                    content: true,
                    description: true,
                    label: true,
                    type: true,
                    Caraminhola_relation: true,
                },
            });
        });
    }
}
exports.caraminholaRepository = caraminholaRepository;
