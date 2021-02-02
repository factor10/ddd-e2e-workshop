import Status from "http-status-codes";
import { Request, Response, Router } from "express";
import { IDayRepository } from "src/domain-model";

export class DayController {
  constructor(private dayRepository: IDayRepository) {}

  public get routes() {
    const router = Router();
    router.get("/all", this.getAllDays.bind(this));
    return router;
  }

  public async getAllDays(_req: Request, res: Response) {
    const days = await this.dayRepository.all();
    res.status(Status.OK).json({ days });
  }
}
