import { Router } from "express";
import { generarIdea } from "../controllers/generarController.js";

const router = Router();

router.post("/generar", generarIdea);

export default router;