import express from "express";
import cors from "cors";
import userRoutes from "./modules/users/userRoutes";
import documentRoutes from "./modules/documents/documentRoutes";
import { errorHandler } from "./common/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/documents", documentRoutes);

app.use(errorHandler);

export default app;
