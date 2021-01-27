import { Consultant, Registration } from ".";

export class Day {
  private _registrations: Array<Registration> = [];
  private _consultant: Consultant;

  constructor(consultant: Consultant, public date: Date) {
    this._consultant = consultant;
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

  addRegistration(registration: Registration) {
    this._registrations.push(registration);
  }

  toJSON(): any {
    return {
      consultant: this.consultant.toJSON(),
      date: this.date,
      registrations: this._registrations.map(r => r.toJSON())
    };
  }

  static fromJsonObject(dayObject: any): Day {
    const day = new Day(
      Consultant.fromJsonObject(dayObject.consultant),
      new Date(dayObject.date)
    );
    dayObject.registrations.forEach((r: any) =>
      day.addRegistration(Registration.fromJsonObject(r))
    );
    return day;
  }
}
