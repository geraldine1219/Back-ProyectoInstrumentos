import { Router, Request, Response } from "express";
import { addAlumnoController, getAulaController, listAulaController, listAulaNameIdController } from "../controller/aulas.controller";

const router = Router();

router.get("/get/:dni", getAulaController);
router.post("/add", addAlumnoController);
router.get("/list", listAulaController);
router.get("/listNameId", listAulaNameIdController);

export default router;