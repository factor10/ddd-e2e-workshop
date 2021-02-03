import { Customer, Duration, Project, ProjectSnapshot } from ".";

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

  toJSON(): Record<string, any> {
    return {
      duration: this._duration.toJSON(),
      activity: this._activity,
      projectSnapshot: this._projectSnapshot.toJSON()
    };
  }

  static fromJsonObject(registrationObject: any): Registration {
    return new Registration(
      Duration.fromJsonObject(registrationObject.duration),
      registrationObject.activity,
      new Project(new Customer(""), registrationObject.projectSnapshot.name)
    );
  }
}
