import express from "express";
import cors from "cors";
import generarRoutes from "./routes/generar.js";

const app = express();
app.use(cors());
app.use(express.json());

//Middleware para registrar cada solicitud entrante en la consola. Esto es útil para depuración y monitoreo, ya que permite ver qué rutas se están accediendo y con qué métodos HTTP (GET, POST, etc.).
app.use((req, res, next) => {
  console.log(`>>> ${req.method} ${req.path}`);

  // Se llama a next() para pasar el control a la siguiente ruta en la cadena de procesamiento.
  next();
});

//Se utiliza el enrutador de generarRoutes para manejar las rutas relacionadas con la generación de ideas. Esto significa que cualquier solicitud que coincida con las rutas definidas en generarRoutes (como "/generar") será manejada por ese enrutador
app.use("/", generarRoutes);

export default app;
