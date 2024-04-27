"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const notMorgan_1 = require("./utils/notMorgan");
const setRoutes_routes_1 = require("./setRoutes.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
const PORT = process.env.PORT || 8000;
dotenv_1.default.config();
app.use(express_1.default.json());
app.get("/", notMorgan_1.notMorgan, (req, res) => {
    res.status(200).json({ message: "hello world with Typescript" });
});
(0, setRoutes_routes_1.routes)(app);
app.listen(PORT, () => `server running on port ${PORT}`);
