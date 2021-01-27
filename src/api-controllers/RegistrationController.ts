import Status from "http-status-codes";
import { Request, Response } from "express";
import { ConsultantAgent } from "src/anti-corruption-layer";
import {
  Customer,
  Day,
  Duration,
  IDayRepository,
  Project,
  Registration
} from "src/domain-model";
import { paramMissingError } from "src/shared/constants";
import { Guid } from "guid-typescript";

interface IRegistrationRequest extends Request {
  body: {
    registration: {
      consultantId: Guid;
      date: string;
      customer: string;
      project: string;
      activity: string;
      duration: string;
    };
  };
}

export class RegistrationController {
  private consultantAgent = new ConsultantAgent();

  constructor(private dayRepository: IDayRepository) {}

  public async addRegistration(req: IRegistrationRequest, res: Response) {
    const dto = req.body.registration;
    if (!dto) {
      return res.status(Status.BAD_REQUEST).json({
        error: paramMissingError
      });
    }

    const consultant = this.consultantAgent.theOneWithId(dto.consultantId);
    if (!consultant) {
      return res.status(Status.BAD_REQUEST).json({
        error: "No such consultant"
      });
    }

    const day = new Day(consultant, new Date(dto.date));
    const customer = new Customer(dto.customer);
    const project = new Project(customer, dto.project);
    const duration = Duration.Create(dto.duration);
    const registration = new Registration(duration, dto.activity, project);
    day.addRegistration(registration);
    await this.dayRepository.save(day);
    res.status(Status.CREATED).end();
  }
}
