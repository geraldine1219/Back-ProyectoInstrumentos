// const { Router } = require("express");
// const { loginUser } = require("../../controller/login.controller");
import { Router } from "express";
import { addAsignaturaController, getAsignaturaController, listAsignaturaController, listAsignaturaNameIdController } from "../controller/asignatura.controller";

const router = Router();

// router.get("/get/:dni", getAlumnoController);
router.post("/add", addAsignaturaController);
router.get("/get/:idAsignatura", getAsignaturaController);
router.get("/list", listAsignaturaController);
router.get("/listNameId", listAsignaturaNameIdController);

export default router;