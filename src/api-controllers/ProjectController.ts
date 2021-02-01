import Status from "http-status-codes";
import { Request, Response } from "express";
import { IConsultantAgent, IProjectRepository } from "src/domain-model";
import { Guid } from "guid-typescript";

export class ProjectController {
  constructor(
    private projectRepository: IProjectRepository,
    private consultantAgent: IConsultantAgent
  ) {}

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
