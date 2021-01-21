import Status from "http-status-codes";
import { Request, Response } from "express";
import { ConsultantAgent } from "src/anti-corruption-layer";

const consultantAgent = new ConsultantAgent();

export const getAllConsultants = (_req: Request, res: Response) => {
  const consultants = consultantAgent.all();
  res.status(Status.OK).json({ consultants });
};
