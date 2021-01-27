import { Router } from "express";
import { DayController } from "src/api-controllers";
import { FileBasedDayRepository } from "src/infrastructure";

const dayController = new DayController(new FileBasedDayRepository());
const router = Router();
router.get("/all", dayController.getAllDays.bind(dayController));

export default router;
