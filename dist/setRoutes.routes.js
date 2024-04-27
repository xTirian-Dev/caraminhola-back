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
exports.routes = void 0;
const express_1 = require("express");
const startGame_service_1 = require("./useCases/setMiniGame/startGame.service");
const handleLevel_service_1 = require("./useCases/setMiniGame/handleLevel.service");
const routes = (app) => {
    app.use('/caraminhola', (0, express_1.Router)().post('/game', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const start = yield new startGame_service_1.StartGameService().execute({
                remainLife: req.body.remainLife,
                score: req.body.score,
                remainTime: req.body.remainTime,
                selectedWordNow: req.body.selectedWordNow,
                alreadySelectedWordsIncome: req.body.alreadySelectedWordsIncome,
            });
            return res.status(200).json(Object.assign({}, start));
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    })));
    app.use('/caraminhola', (0, express_1.Router)().get('/new-level', (req, res) => res.status(200).json({ message: 'new level' })));
    app.use('/caraminhola', (0, express_1.Router)().post('/new-level', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        // TODO: SEMPRE COMEÇA COM A CARAMINHOLA   
        try {
            const caraminhola = yield new handleLevel_service_1.HandleLevel().execute(id);
            return res.status(200).json({ caraminhola });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    })));
};
exports.routes = routes;
