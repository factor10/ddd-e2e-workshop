import Status from "http-status-codes";
import { Request, Response, Router } from "express";
import {
  Consultant,
  Day,
  Duration,
  IConsultantAgent,
  IDayRepository,
  IProjectRepository,
  Registration
} from "src/domain-model";
import { Guid } from "guid-typescript";

interface IRegistrationRequest extends Request {
  body: {
    registration: {
      consultantId: Guid;
      date: string;
      projectName: string;
      activity: string;
      duration: string;
    };
  };
}

export class RegistrationController {
  constructor(
    private dayRepository: IDayRepository,
    private consultantAgent: IConsultantAgent,
    private projectRepository: IProjectRepository
  ) {}

  public get routes() {
    const router = Router();
    router.post("/", this.addRegistration.bind(this));
    return router;
  }

  public async addRegistration(req: IRegistrationRequest, res: Response) {
    const dto = req.body.registration;
    if (!dto) {
      throw new Error("One or more of the required parameters was missing");
    }

    const consultant = this.getConsultant(dto.consultantId);
    const project = await this.getProject(consultant, dto.projectName);
    const duration = Duration.Create(dto.duration);
    const registration = new Registration(duration, dto.activity, project);
    const date = new Date(dto.date);

    // TODO: Maybe check if day already exist and update that instead of creating a new Day?
    const day = new Day(consultant, date);
    day.addRegistration(registration);
    await this.dayRepository.save(day);
    res.status(Status.CREATED).end();
  }

  private getConsultant(consultantId: Guid) {
    const consultant = this.consultantAgent.theOneWithId(consultantId);
    if (!consultant) {
      throw new Error("No such consultant");
    }
    return consultant;
  }

  private async getProject(consultant: Consultant, projectName: string) {
    const projectsForConsultant = await this.projectRepository.projectsForConsultant(
      consultant
    );
    const project = projectsForConsultant.find(p => p.name === projectName);
    if (!project) {
      throw new Error("No such project");
    }
    return project;
  }
}
