import { Router } from "express";
import { RegistrationController } from "src/api-controllers";
import { FileBasedDayRepository } from "src/infrastructure";

const controller = new RegistrationController(new FileBasedDayRepository());
const router = Router();
router.post("/", controller.addRegistration.bind(controller));

export default router;
