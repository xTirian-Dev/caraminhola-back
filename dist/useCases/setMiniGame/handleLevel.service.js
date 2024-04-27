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
exports.HandleLevel = void 0;
const caraminhola_repository_1 = require("../../repositories/caraminhola.repository");
const caraminholaRelation_repository_1 = require("../../repositories/caraminholaRelation.repository");
class HandleLevel {
    constructor() {
        this.caraminholaRepository = new caraminhola_repository_1.caraminholaRepository();
        this.caraminholaRelationReposirory = new caraminholaRelation_repository_1.caraminholaRelationReposirory();
    }
    getStartCaraminhoa() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.caraminholaRepository.findFirst({ where: { content: "caraminhola" } });
        });
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    getNewCaraminhola(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const caraminhola = yield this.caraminholaRepository.getCaraminhola(id);
            if (!caraminhola)
                throw new Error("Caraminhola not found");
            const caraminholaRelation = caraminhola === null || caraminhola === void 0 ? void 0 : caraminhola.Caraminhola_relation.map((relation) => {
                return relation.caraminhola_id;
            });
            if (!(caraminholaRelation === null || caraminholaRelation === void 0 ? void 0 : caraminholaRelation.length))
                throw new Error("Caraminhola Relation not found");
            const caraminholaRelationShuffle = this.shuffleArray(caraminholaRelation);
            const caraminholaRelationCardsSelect = yield this.caraminholaRepository.findMany({
                where: {
                    id: {
                        in: caraminholaRelationShuffle.slice(0, 3)
                    }
                }
            });
            const caraminholaModel = Object.assign(Object.assign({}, caraminhola), { Caraminhola_relation: caraminholaRelationCardsSelect });
            return caraminholaModel;
        });
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return yield this.getStartCaraminhoa();
            }
            return yield this.getNewCaraminhola(id);
        });
    }
}
exports.HandleLevel = HandleLevel;
