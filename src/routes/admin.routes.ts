import { Router, Request, Response } from "express";
import { loginAdminController, addAdminController, getAdminController } from "../controller/admin.controller";

const router = Router();

router.post("/login", loginAdminController);

router.get("/get/:dni", getAdminController);
router.post("/add", addAdminController);

export default router;