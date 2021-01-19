import StatusCodes from "http-status-codes";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
import { Request, Response, Router } from "express";

import { ConsultantAgent } from "src/anti-corruption-layer";
import { FileBasedDayRepository } from "src/repositories";
import { Consultant, Day } from "src/domain-model";
import { paramMissingError, IRequest } from "src/shared/constants";
import { Guid } from "guid-typescript";

const router = Router();
const consultantAgent = new ConsultantAgent();
const dayRepository = new FileBasedDayRepository();

router.get("/all", async (req: Request, res: Response) => {
  const days = await dayRepository.all();
  res.status(OK).json({ days });
});

router.post("/add", async (req: Request, res: Response) => {
  const dayData = req.body.day;
  if (!dayData) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError
    });
  }

  const consultant = consultantAgent.theOneWithId(dayData.consultantId);
  if (!consultant) {
    return res.status(BAD_REQUEST).json({
      error: "No such consultant"
    });
  }

  const day = new Day(consultant, new Date(dayData.date));
  await dayRepository.save(day);
  return res.status(CREATED).end();
});

export default router;
