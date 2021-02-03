import { Guid } from "guid-typescript";
import deepEqual from "deep-equal";
import { Person } from ".";

export class Consultant {
  private _id: Guid;
  private _person: Person;

  constructor(id: Guid, firstName: string, lastName: string) {
    this._id = id;
    this._person = new Person(firstName, lastName);
  }

  get id(): Guid {
    return this._id;
  }

  get person(): Person {
    return this._person;
  }

  equal(other: Consultant): boolean {
    return deepEqual(this, other);
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      person: this.person.toJSON()
    };
  }

  static fromJsonObject(consultantObject: any): Consultant {
    return new Consultant(
      consultantObject.id,
      consultantObject.person.firstName,
      consultantObject.person.lastName
    );
  }
}
