import { Router } from "express";
import DaysRouter from "./DaysRouter";
import ConsultantsRouter from "./ConsultantsRouter";
import RegistrationRouter from "./RegistrationRouter";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/consultants", ConsultantsRouter);
router.use("/days", DaysRouter);
router.use("/registration", RegistrationRouter);

// Export the base-router
export default router;
