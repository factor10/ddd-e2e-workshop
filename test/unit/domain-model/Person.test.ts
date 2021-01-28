import { Person } from "src/domain-model";

describe("When creating a person", () => {
  let person: Person;

  beforeEach(() => {
    person = new Person("Jimmy", "Nilsson");
  });

  test("Then the names are set", () => {
    expect(person.firstName).toEqual("Jimmy");
    expect(person.lastName).toEqual("Nilsson");
  });

  test("Then the full name is set", () => {
    expect(person.fullName).toEqual("Jimmy Nilsson");
  });

  test("Then the object is equal to one created with fullname", () => {
    const anotherPerson = Person.CreateFromFullName("Jimmy Nilsson");
    expect(person).toEqual(anotherPerson);
  });

  test.each([
    [true, "Jimmy", "Nilsson"],
    [false, "???", "Nilsson"],
    [false, "Jimmy", "???"]
  ])(
    "Then it is equal to another object or not depending on the values",
    (expected: boolean, firstName: string, lastName: string) => {
      const anotherPerson = new Person(firstName, lastName);
      expect(person.equal(anotherPerson)).toBe(expected);
    }
  );
});
