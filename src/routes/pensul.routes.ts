import { Router } from "express";
import { addPensulController, listAlumnoNameIdController, listPensulController, listAlumnoProfesorController } from "../controller/pensul.controller";

const router = Router();

// router.get("/get/:idProfesor", getProfesorController);
router.post("/add", addPensulController);
router.get("/list", listPensulController);
router.get("/listNameId", listAlumnoNameIdController);
router.get("/listAlumnos/:idProfesor", listAlumnoProfesorController);

export default router;