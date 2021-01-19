import StatusCodes from "http-status-codes";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
import { Request, Response, Router } from "express";

import { FileBasedDayRepository } from "src/repositories";
import { ConsultantAgent } from "src/anti-corruption-layer";
import { paramMissingError, IRequest } from "@shared/constants";
import { Consultant } from "src/domain-model";

const router = Router();
const dayRepository = new FileBasedDayRepository();
const consultantAgent = new ConsultantAgent();

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/
/*
router.post("/add", async (req: IRequest, res: Response) => {
  const { user } = req.body;
  if (!user) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError
    });
  }
  await userDao.add(user);
  return res.status(CREATED).end();
});
*/

/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/
/*
router.put("/update", async (req: IRequest, res: Response) => {
  const { user } = req.body;
  if (!user) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError
    });
  }
  user.id = Number(user.id);
  await userDao.update(user);
  return res.status(OK).end();
});

/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/
/*
router.delete("/delete/:id", async (req: IRequest, res: Response) => {
  const { id } = req.params;
  await userDao.delete(Number(id));
  return res.status(OK).end();
});
*/

export default router;
