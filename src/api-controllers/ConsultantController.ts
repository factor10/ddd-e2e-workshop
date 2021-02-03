import Status from "http-status-codes";
import { Request, Response, Router } from "express";
import { IConsultantAgent, IProjectRepository } from "src/domain-model";
import { Guid } from "guid-typescript";

export class ConsultantController {
  constructor(
    private consultantAgent: IConsultantAgent,
    private projectRepository: IProjectRepository
  ) {}

  public get routes() {
    const router = Router();
    router.get("/", this.getAllConsultants.bind(this));
    router.get(
      "/:consultantId/projects",
      this.getProjectsForConsultant.bind(this)
    );
    return router;
  }

  public getAllConsultants(_req: Request, res: Response) {
    const consultants = this.consultantAgent.all();
    res.status(Status.OK).json({ consultants });
  }

  public async getProjectsForConsultant(req: Request, res: Response) {
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
