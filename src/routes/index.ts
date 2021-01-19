import { Router } from "express";
import ConsultantsRouter from "./ConsultantsRouter";
import DaysRouter from "./DaysRouter";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/consultants", ConsultantsRouter);
router.use("/days", DaysRouter);

// Export the base-router
export default router;
