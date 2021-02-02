import Status from "http-status-codes";
import { Request, Response, Router } from "express";
import { IConsultantAgent } from "src/domain-model";

export class ConsultantController {
  constructor(private consultantAgent: IConsultantAgent) {}

  public get routes() {
    const router = Router();
    router.get("/all", this.getAllConsultants.bind(this));
    return router;
  }

  public getAllConsultants(_req: Request, res: Response) {
    const consultants = this.consultantAgent.all();
    res.status(Status.OK).json({ consultants });
  }
}
