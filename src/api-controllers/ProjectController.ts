import Status from "http-status-codes";
import { Request, Response, Router } from "express";
import { IConsultantAgent, IProjectRepository } from "src/domain-model";
import { Guid } from "guid-typescript";

export class ProjectController {
  constructor(
    private projectRepository: IProjectRepository,
    private consultantAgent: IConsultantAgent
  ) {}

  public get routes() {
    const router = Router();
    router.get(
      "/for-consultant/:consultantId",
      this.getAllForConsultant.bind(this)
    );
    return router;
  }

  public async getAllForConsultant(req: Request, res: Response) {
    const consultantId = Guid.parse(req.params.consultantId);
    const consultant = this.consultantAgent.theOneWithId(consultantId);
    if (!consultant) {
      throw new Error("No such consultant");
    }
    const projects = await this.projectRepository.projectsForConsultant(
      consultant
    );
    res.status(Status.OK).json({ projects });
  }
}
