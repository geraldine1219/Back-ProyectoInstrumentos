// const { Router } = require("express");
// const { loginUser } = require("../../controller/login.controller");
import { Router } from "express";
import { loginAlumnoController, addAlumnoController, getAlumnoController, 
    listAlumnoController, listAlumnoPensulController, listAlumnoNameIdController } from "../controller/alumno.controller";

const router = Router();

router.post("/login", loginAlumnoController);

router.get("/get/:dni", getAlumnoController);
router.post("/add", addAlumnoController);
router.get("/list", listAlumnoController);
router.get("/pensul/:idAlumno", listAlumnoPensulController);
router.get("/listNameId", listAlumnoNameIdController);

export default router;
