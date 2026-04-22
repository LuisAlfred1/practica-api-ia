import { Router } from "express";
import { generarIdea } from "../controllers/generarController.js";

//Se crea un enrutador de Express para manejar las rutas relacionadas con la generación de ideas. En este caso, se define una ruta POST en "/generar" que invoca la función generarIdea del controlador generarController.js cuando se recibe una solicitud en esa ruta.
const router = Router();

router.post("/generar", generarIdea);

export default router;