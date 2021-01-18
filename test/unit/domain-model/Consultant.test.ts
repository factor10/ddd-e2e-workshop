import { Guid } from "guid-typescript";
import { Consultant } from "src/domain-model";

describe("When creating a consultant", () => {
  const idAsString = "b1f585d0-4563-4064-b5d9-418105fd33be";
  const consultant = new Consultant(Guid.parse(idAsString), "Jimmy", "Nilsson");

  test.each([
    [true, idAsString, "Jimmy", "Nilsson"],
    [false, "000085d0-4563-4064-b5d9-418105fd0000", "Jimmy", "Nilsson"],
    [false, idAsString, "???", "Nilsson"],
    [false, idAsString, "Jimmy", "???"]
  ])(
    "Then it is equal to another object or not depending on the values",
    (expected: boolean, id: string, firstName: string, lastName: string) => {
      const anotherConsultant = new Consultant(
        Guid.parse(id),
        firstName,
        lastName
      );
      expect(consultant.equal(anotherConsultant)).toBe(expected);
    }
  );
});
