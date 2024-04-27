import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { Router, Request, Response } from "express";
import { notMorgan } from "./utils/notMorgan";
import { routes } from "./setRoutes.routes";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,  
}));
const PORT = process.env.PORT || 8000;
dotenv.config();

app.use(express.json());
app.get("/", notMorgan, (req: Request, res: Response) => {
  res.status(200).json({ message: "hello world with Typescript" });
});

routes(app);

app.listen(PORT, () => `server running on port ${PORT}`);
