import { Router } from "express";
import { addClaseController, getClaseController, listClaseController, listClaseNameIdController } from "../controller/clase.controller";

const router = Router();

router.get("/get/:idClase", getClaseController);
router.post("/add", addClaseController);
router.get("/list", listClaseController);
router.get("/listNameId", listClaseNameIdController);

export default router;