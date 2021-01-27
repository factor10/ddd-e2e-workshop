import { Consultant, Registration } from ".";

export enum DayState {
  NotApproved = 0,
  ApprovedByConsultant = 1,
  ApprovedByManager = 2
}

export class Day {
  private _registrations: Array<Registration> = [];
  private _consultant: Consultant;
  private _state: DayState;

  constructor(
    consultant: Consultant,
    public date: Date,
    state = DayState.NotApproved
  ) {
    this._consultant = consultant;
    this._state = state;
  }

  public get consultant(): Consultant {
    return this._consultant;
  }

  public get registrations(): Array<Registration> {
    return this._registrations;
  }

  public get hours(): number {
    return this._registrations.reduce(
      (acc: number, curr: Registration) => acc + curr.duration.hours,
      0
    );
  }

  public get state(): DayState {
    return this._state;
  }

  addRegistration(registration: Registration) {
    this._registrations.push(registration);
  }

  toJSON(): any {
    return {
      consultant: this.consultant.toJSON(),
      date: this.date,
      registrations: this._registrations.map(r => r.toJSON()),
      state: this._state
    };
  }

  static fromJsonObject(dayObject: any): Day {
    const day = new Day(
      Consultant.fromJsonObject(dayObject.consultant),
      new Date(dayObject.date),
      dayObject.state
    );
    dayObject.registrations.forEach((r: any) =>
      day.addRegistration(Registration.fromJsonObject(r))
    );
    return day;
  }
}
