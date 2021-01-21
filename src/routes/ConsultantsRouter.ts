import { Router } from "express";
import { getAllConsultants } from "src/api-controllers";

const router = Router();
router.get("/all", getAllConsultants);

export default router;
