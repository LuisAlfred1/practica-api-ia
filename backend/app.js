import express from "express";
import cors from "cors";
import generarRoutes from "./routes/generar.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`>>> ${req.method} ${req.path}`);
  next();
});

app.use("/", generarRoutes);

export default app;
