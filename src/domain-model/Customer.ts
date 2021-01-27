import deepEqual from "deep-equal";

export class Customer {
  constructor(public name: string) {}

  equal(other: Customer): boolean {
    return deepEqual(this, other);
  }
}
