import Status from "http-status-codes";
import { Request, Response } from "express";
import { ConsultantAgent } from "src/anti-corruption-layer";
import { Day, IDayRepository } from "src/domain-model";
import { paramMissingError } from "src/shared/constants";

export class DayController {
  private consultantAgent = new ConsultantAgent();

  constructor(private dayRepository: IDayRepository) {}

  public async getAllDays(_req: Request, res: Response) {
    const days = await this.dayRepository.all();
    res.status(Status.OK).json({ days });
  }

  public async addDay(req: Request, res: Response) {
    const dayData = req.body.day;
    if (!dayData) {
      return res.status(Status.BAD_REQUEST).json({
        error: paramMissingError
      });
    }

    const consultant = this.consultantAgent.theOneWithId(dayData.consultantId);
    if (!consultant) {
      return res.status(Status.BAD_REQUEST).json({
        error: "No such consultant"
      });
    }

    const day = new Day(consultant, new Date(dayData.date));
    await this.dayRepository.save(day);
    res.status(Status.CREATED).end();
  }
}
