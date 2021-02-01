import { Router } from "express";
import { ConsultantAgent } from "src/anti-corruption-layer";
import { ProjectController } from "src/api-controllers";
import { FakeProjectRepository } from "src/infrastructure";

const router = Router();
const projectRepo = new FakeProjectRepository();
const consultantAgent = new ConsultantAgent();
const projectController = new ProjectController(projectRepo, consultantAgent);
router.get(
  "/for-consultant/:consultantId",
  projectController.getAllForConsultant.bind(projectController)
);

export default router;
