import { Router } from "express";
import { addInstrumentoController, getInstrumentoController, 
    listInsrumentoController, listInstrumentoNameIdController } from "../controller/instrumento.controller";

const router = Router();

router.get("/get/:idInstrumento", getInstrumentoController);
router.post("/add", addInstrumentoController);
router.get("/list", listInsrumentoController);
router.get("/listNameId", listInstrumentoNameIdController);

export default router;