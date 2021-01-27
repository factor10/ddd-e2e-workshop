import Status from "http-status-codes";
import { Request, Response } from "express";
import { IDayRepository } from "src/domain-model";

export class DayController {
  constructor(private dayRepository: IDayRepository) {}

  public async getAllDays(_req: Request, res: Response) {
    const days = await this.dayRepository.all();
    res.status(Status.OK).json({ days });
  }
}
