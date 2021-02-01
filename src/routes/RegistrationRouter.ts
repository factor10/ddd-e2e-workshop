import { Router } from "express";
import { ConsultantAgent } from "src/anti-corruption-layer";
import { RegistrationController } from "src/api-controllers";
import {
  FakeProjectRepository,
  FileBasedDayRepository
} from "src/infrastructure";

const dayRepository = new FileBasedDayRepository();
const consultantAgent = new ConsultantAgent();
const projectRepository = new FakeProjectRepository();
const controller = new RegistrationController(
  dayRepository,
  consultantAgent,
  projectRepository
);
const router = Router();
router.post("/", controller.addRegistration.bind(controller));

export default router;
