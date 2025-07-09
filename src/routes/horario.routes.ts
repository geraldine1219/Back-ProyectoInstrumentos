import { Router } from "express";
import { addHorarioController, listHorarioController, listHorarioNameIdController } from "../controller/horario.controller";

const router = Router();

router.post("/add", addHorarioController);
router.get("/list", listHorarioController);
router.get("/listNameId", listHorarioNameIdController);

export default router; 