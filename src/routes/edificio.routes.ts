import { Router } from "express";
import { addEdificioController, listAlumnoController, listEdificioController } from "../controller/edificio.controller";

const router = Router();

// router.get("/get/:idClase", getClaseController);
router.post("/add", addEdificioController);
router.get("/list", listAlumnoController);
router.get("/listNameId", listEdificioController);

export default router;