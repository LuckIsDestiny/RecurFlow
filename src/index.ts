import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send( "Hello from RecurFlow");
});

app.listen(PORT, () => {
  console.log(`Recur Flow running on http://localhost:${PORT}`);
});
