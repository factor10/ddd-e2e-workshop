import deepEqual from "deep-equal";

export class Person {
  constructor(public firstName: string, public lastName: string) {}

  static CreateFromFullName(fullName: string): Person {
    const parts = fullName.split(/ (.*)/, 2);
    const firstName = parts[0];
    const lastName = parts[1];
    return new Person(firstName, lastName);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  equal(other: Person): boolean {
    return deepEqual(this, other);
  }

  toJSON(): Record<string, any> {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName
    };
  }
}
