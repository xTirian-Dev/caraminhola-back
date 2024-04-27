"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeRule = void 0;
class LifeRule {
    constructor() {
        this.startLife = 3;
        this.getStartLife = () => {
            return this.startLife;
        };
    }
    validate(remainLife) {
        if (remainLife === 0) {
            return false; // GAME OVER
        }
        return true;
    }
    removeLife(remainLife) {
        return remainLife - 1;
    }
    addLife(remainLife) {
        return remainLife + 1;
    }
}
exports.LifeRule = LifeRule;
