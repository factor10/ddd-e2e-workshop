import { Router } from "express";
import DaysRouter from "./DaysRouter";
import ConsultantsRouter from "./ConsultantsRouter";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/consultants", ConsultantsRouter);
router.use("/days", DaysRouter);

// Export the base-router
export default router;
