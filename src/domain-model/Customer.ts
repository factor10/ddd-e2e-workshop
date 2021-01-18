import deepEqual from "deep-equal";

export class Customer {
  constructor(public name: string) {}

  equal(other: Customer): boolean {
    //if (other == null) return false;
    //if (this === other) return true;
    return deepEqual(this, other);
  }
}
