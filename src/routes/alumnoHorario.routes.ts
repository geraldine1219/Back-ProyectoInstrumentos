import { Router, Request, Response } from "express";
import { addAlumnoHorarioController, getAlumnoHorarioController } from "../controller/alumnoHorario.controller";

const router = Router();

// router.get("/get/:dni", getAdminController);
router.post("/add", addAlumnoHorarioController);
router.get("/horario/:idAlumno", getAlumnoHorarioController);

export default router;