"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreRule = void 0;
class ScoreRule {
    constructor() {
        this.startScore = 0;
        this.normalScore = 3;
        this.buffedScore = 5;
    }
    validate({ typeOfScore }) {
        switch (typeOfScore) {
            case "buffed":
                return this.buffedScore;
            default:
                return this.normalScore;
        }
    }
    addScore({ score, newPoints }) {
        if (!score && !newPoints)
            return this.startScore;
        if (!score)
            return 0 + this.normalScore;
        if (!newPoints)
            return score + this.normalScore;
        return score + newPoints;
    }
    handlerScore(scoreProps) {
        let newPoints = this.validate({ typeOfScore: scoreProps.typeOfScore });
        if (newPoints) {
            return this.addScore({ score: scoreProps.score, newPoints });
        }
        return this.addScore({ score: scoreProps.score, newPoints: 3 });
    }
    startScoreValue() {
        return this.startScore;
    }
}
exports.ScoreRule = ScoreRule;
