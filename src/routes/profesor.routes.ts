import { Router } from "express";
import { loginProfesorController22, addProfesorController, getProfesorController, 
    listProfesorController, listProfesorNameIdController, listAlumnoProfesor } from "../controller/profesor.controller";

const router = Router();

// router.post("/login", loginProfesorController22);
router.post("/login", loginProfesorController22);


router.get("/get/:idProfesor", getProfesorController);
router.post("/add", addProfesorController);
router.get("/list", listProfesorController);
router.get("/listNameId", listProfesorNameIdController);
router.get("/list/alumnos/:idProfesor", listAlumnoProfesor);

export default router;