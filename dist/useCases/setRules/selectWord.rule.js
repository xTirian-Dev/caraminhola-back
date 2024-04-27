"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectWordRule = void 0;
const prismaConfig_1 = __importDefault(require("../../utils/prismaConfig"));
class SelectWordRule {
    constructor() {
        this.alreadySelectedWords = [];
    }
    selectFirstWord() {
        const firstWord = prismaConfig_1.default.caraminhola.findFirst({
            where: {
                content: 'Caraminhola'
            },
            select: {
                id: true,
                content: true,
                description: true,
                label: true,
                type: true,
                Caraminhola_relation: true,
            }
        });
        return firstWord;
    }
    validate({ selectedWordNow }) {
        if (!selectedWordNow)
            throw new Error("selectedWordNow is required");
        const isWordSelected = this.alreadySelectedWords.includes(selectedWordNow);
        if (isWordSelected) {
            return true;
        }
        return false;
    }
    insertSelectedWords({ alreadySelectedWordsIncome, }) {
        console.log(alreadySelectedWordsIncome);
        if (alreadySelectedWordsIncome)
            alreadySelectedWordsIncome.forEach((word) => {
                this.alreadySelectedWords.push(word);
            });
    }
    resetInsertSelectedWords() {
        this.alreadySelectedWords = [];
    }
    handleSelectedWord({ alreadySelectedWordsIncome, selectedWordNow, }) {
        console.log(alreadySelectedWordsIncome);
        if ((alreadySelectedWordsIncome === null || alreadySelectedWordsIncome === void 0 ? void 0 : alreadySelectedWordsIncome.length) !== 0)
            this.insertSelectedWords({ alreadySelectedWordsIncome });
        if (!selectedWordNow)
            throw new Error("selectedWordNow is required");
        const isWordSelectedBefore = this.validate({ selectedWordNow });
        if (!isWordSelectedBefore) {
            this.alreadySelectedWords.push(selectedWordNow);
            return { isWordSelectedBefore, alreadySelectedWords: this.alreadySelectedWords };
        }
        ;
        return {
            isWordSelectedBefore,
            alreadySelectedWords: this.alreadySelectedWords,
        };
    }
}
exports.SelectWordRule = SelectWordRule;
