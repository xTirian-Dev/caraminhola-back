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
exports.HandleNewWord = void 0;
const caraminhola_repository_1 = require("../../repositories/caraminhola.repository");
const caraminholaRelation_repository_1 = require("../../repositories/caraminholaRelation.repository");
const prismaConfig_1 = __importDefault(require("../../utils/prismaConfig"));
class HandleNewWord {
    constructor() {
        this.caraminholaRepository = new caraminhola_repository_1.caraminholaRepository();
        this.caraminholaRelationReposirory = new caraminholaRelation_repository_1.caraminholaRelationReposirory();
    }
    validate(newWord, currentWordId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!newWord)
                throw new Error("newWord is required");
            if (!currentWordId)
                throw new Error("currentWordId is required");
            if (newWord.length < 3)
                throw new Error("newWord must have at least 3 characters");
            const isOneWord = /^\w+$/;
            if (!isOneWord.test(newWord.trim()))
                throw new Error("newWord must have only one word");
            const wordIsUsed = yield this.caraminholaRepository.findFirst({
                where: {
                    OR: [
                        {
                            content: {
                                equals: newWord.trim(),
                            },
                        },
                        {
                            content: {
                                equals: newWord.trim().toLocaleLowerCase(),
                            },
                        },
                        {
                            content: {
                                equals: newWord.trim().toLocaleUpperCase(),
                            },
                        },
                    ],
                },
                include: {
                    Caraminhola_relation: true,
                },
            });
            if (wordIsUsed)
                return wordIsUsed;
            const AddNewWord = yield this.caraminholaRepository.create({
                data: {
                    content: newWord.trim().toLocaleLowerCase(),
                    description: "",
                    label: "",
                    type: "palavra",
                },
            });
            const currentWord = yield this.caraminholaRepository.getCaraminhola(currentWordId);
            if (!currentWord)
                throw new Error("currentWord not found");
            const transaction = yield prismaConfig_1.default.$transaction([
                this.caraminholaRelationReposirory.create({
                    data: {
                        caraminhola_id: currentWord.id,
                        caraminhola_id_relation: AddNewWord.id,
                    },
                }),
                this.caraminholaRelationReposirory.create({
                    data: {
                        caraminhola_id: AddNewWord.id,
                        caraminhola_id_relation: currentWord.id,
                    },
                }),
                ...currentWord.Caraminhola_relation.map((relation) => this.caraminholaRelationReposirory.create({
                    data: {
                        caraminhola_id: relation.caraminhola_id,
                        caraminhola_id_relation: AddNewWord.id,
                    },
                })),
            ]);
            console.log(transaction);
            if (!transaction[3])
                throw new Error("transaction failed");
            return yield this.caraminholaRepository.getCaraminhola(AddNewWord.id);
        });
    }
    execute(newWord, currentWordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.validate(newWord, currentWordId);
        });
    }
}
exports.HandleNewWord = HandleNewWord;
