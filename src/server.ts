import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { Router, Request, Response } from "express";
import { notMorgan } from "./utils/notMorgan";

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,  
}));
const PORT = process.env.PORT || 4000;
dotenv.config();
const route = Router();

app.use(express.json());
route.get("/", notMorgan, (req: Request, res: Response) => {
  res.status(200).json({ message: "hello world with Typescript" });
});

app.use(route);

app.listen(PORT, () => `server running on port ${PORT}`);
