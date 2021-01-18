import { Consultant, Duration, Project, ProjectSnapshot } from ".";

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

  asJsonFriendly(): any {
    return {
      consultant: this.consultant.asJsonFriendly(),
      date: this.date,
      registrations: this._registrations.map(r => r.asJsonFriendly())
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

export class Registration {
  private _projectSnapshot!: ProjectSnapshot;

  constructor(
    private _duration: Duration,
    private _activity: string,
    project?: Project
  ) {
    if (project != null) {
      this._projectSnapshot = project.takeSnapshot();
    }
  }

  public get duration(): Duration {
    return this._duration;
  }

  public get activity(): string {
    return this._activity;
  }

  public get projectSnapshot(): ProjectSnapshot {
    return this._projectSnapshot;
  }

  asJsonFriendly(): any {
    return {
      duration: this._duration.asJsonFriendly(),
      activity: this._activity
    };
  }

  static fromJsonObject(registrationObject: any): Registration {
    return new Registration(
      Duration.fromJsonObject(registrationObject.duration),
      registrationObject.activity
    );
  }
}
