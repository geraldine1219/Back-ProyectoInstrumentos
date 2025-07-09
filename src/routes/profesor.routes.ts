import { Router } from "express";
import { loginProfesorController, addProfesorController, getProfesorController, 
    listProfesorController, listProfesorNameIdController, listAlumnoProfesor } from "../controller/profesor.controller";

const router = Router();

router.post("/login", loginProfesorController);

router.get("/get/:idProfesor", getProfesorController);
router.post("/add", addProfesorController);
router.get("/list", listProfesorController);
router.get("/listNameId", listProfesorNameIdController);
router.get("/list/alumnos/:idProfesor", listAlumnoProfesor);

export default router;