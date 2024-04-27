"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeRule = void 0;
class TimeRule {
    constructor() {
        this.startTimer = 30;
        this.startTimerCountdown = () => {
            const now = new Date();
            const finalCount = new Date(now.getTime() + this.startTimer * 60000);
            return finalCount.getTime();
        };
    }
    validate(remainTime) {
        if (remainTime <= 0)
            return false;
        return true;
    }
}
exports.TimeRule = TimeRule;
