import { Customer } from ".";
import { Consultant } from "./Consultant";

export class Project {
  private _consultants: Array<Consultant> = [];
  private _activities: Array<string> = [];

  constructor(public customer: Customer, public name: string) {}

  takeSnapshot(): ProjectSnapshot {
    return new ProjectSnapshot(this.name);
  }

  addConsultant(consultant: Consultant) {
    this._consultants.push(consultant);
  }

  get consultants() {
    return this._consultants;
  }

  addActivity(activity: string) {
    this._activities.push(activity);
  }

  get activities(): Array<string> {
    return this._activities;
  }

  get isReadyToGetTimeRegistrations(): boolean {
    return this._consultants.length > 0 && this._activities.length > 0;
  }
}

export class ProjectSnapshot {
  constructor(private _name: string) {}

  public get name(): string {
    return this._name;
  }

  toJSON() {
    return { name: this._name };
  }
}
