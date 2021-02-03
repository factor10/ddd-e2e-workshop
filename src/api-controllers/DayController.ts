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

interface ICreateDayRequest extends Request {
  body: {
    day: {
      date: string;
      consultantId: Guid;
      registration: {
        projectName: string;
        activity: string;
        duration: string;
      };
    };
  };
}
export class DayController {
  constructor(
    private dayRepository: IDayRepository,
    private consultantAgent: IConsultantAgent,
    private projectRepository: IProjectRepository
  ) {}

  public get routes() {
    const router = Router();
    router.get("/all", this.getAllDays.bind(this));
    router.post("/", this.addDay.bind(this));
    return router;
  }

  public async getAllDays(_req: Request, res: Response) {
    const days = await this.dayRepository.all();
    res.status(Status.OK).json({ days });
  }

  public async addDay(req: ICreateDayRequest, res: Response) {
    const dto = req.body.day;
    if (!dto) {
      throw new Error("One or more of the required parameters was missing");
    }

    const consultant = this.getConsultant(dto.consultantId);
    const project = await this.getProject(
      consultant,
      dto.registration.projectName
    );
    const duration = Duration.Create(dto.registration.duration);
    const registration = new Registration(
      duration,
      dto.registration.activity,
      project
    );
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
