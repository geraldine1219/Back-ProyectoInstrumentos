import { Router, Request, Response } from "express";
import { addAlumnoHorarioController, getAlumnoHorarioController, getProfesorHorarioController } from "../controller/alumnoHorario.controller";

const router = Router();

// router.get("/get/:dni", getAdminController);
router.post("/add", addAlumnoHorarioController);
router.get("/horario/:idAlumno", getAlumnoHorarioController);
router.get("/horario/profesor/:idProfesor", getProfesorHorarioController);

export default router;