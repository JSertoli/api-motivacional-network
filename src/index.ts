import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
