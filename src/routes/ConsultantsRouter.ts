import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";
import { ConsultantAgent } from "src/anti-corruption-layer";

const router = Router();
const consultantAgent = new ConsultantAgent();
const { OK } = StatusCodes;

router.get("/all", (_req: Request, res: Response) => {
  const consultants = consultantAgent.all();
  res.status(OK).json({ consultants });
});

export default router;
