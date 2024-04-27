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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartGameService = void 0;
const life_rule_1 = require("../setRules/life.rule");
const score_rule_1 = require("../setRules/score.rule");
const selectWord_rule_1 = require("../setRules/selectWord.rule");
const time_rule_1 = require("../setRules/time.rule");
class StartGameService {
    constructor() {
        this.lifeRule = new life_rule_1.LifeRule();
        this.ScoreRule = new score_rule_1.ScoreRule();
        this.SelectWordRule = new selectWord_rule_1.SelectWordRule();
        this.TimeRule = new time_rule_1.TimeRule();
    }
    startGame() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                life: this.lifeRule.getStartLife(),
                score: this.ScoreRule.startScoreValue(),
                word: yield this.SelectWordRule.selectFirstWord(),
                alreadySelectedWords: [],
            };
        });
    }
    playLevel(levelProps) {
        return __awaiter(this, void 0, void 0, function* () {
            if (levelProps.remainLife === undefined ||
                levelProps.score === undefined ||
                levelProps.remainTime === undefined)
                throw new Error("propertys required || LOG: playLevel");
            let life = levelProps.remainLife;
            let score = levelProps.score;
            let remainTime = levelProps.remainTime;
            const verifySelectWordRule = this.SelectWordRule.handleSelectedWord({
                alreadySelectedWordsIncome: levelProps.alreadySelectedWordsIncome,
                selectedWordNow: levelProps.selectedWordNow,
            });
            const verifyTimeRule = this.TimeRule.validate(remainTime);
            if (verifySelectWordRule.isWordSelectedBefore || !verifyTimeRule) {
                life = this.lifeRule.removeLife(life);
            }
            if (!verifySelectWordRule.isWordSelectedBefore) {
                score = this.ScoreRule.handlerScore({
                    score: levelProps.score,
                    typeOfScore: "normal",
                });
            }
            return {
                life: life,
                score: score,
                alreadySelectedWords: verifySelectWordRule.alreadySelectedWords,
                word: undefined
            };
        });
    }
    execute(gameProps) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!gameProps.remainLife &&
                !gameProps.score &&
                !gameProps.selectedWordNow &&
                !gameProps.remainTime) {
                return yield this.startGame();
            }
            return Object.assign({}, yield this.playLevel(gameProps));
        });
    }
}
exports.StartGameService = StartGameService;
