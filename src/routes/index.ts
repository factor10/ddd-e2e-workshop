import { Router } from "express";
import DaysRouter from "./DaysRouter";
import ConsultantsRouter from "./ConsultantsRouter";
import ProjectRouter from "./ProjectRouter";
import RegistrationRouter from "./RegistrationRouter";

const router = Router();

// Add sub-routes
router.use("/consultants", ConsultantsRouter);
router.use("/days", DaysRouter);
router.use("/registration", RegistrationRouter);
router.use("/project", ProjectRouter);

// Export the base-router
export default router;
