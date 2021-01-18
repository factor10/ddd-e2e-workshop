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

  test("Then_the_full_name_is_set", () => {
    expect(person.fullName).toEqual("Jimmy Nilsson");
  });

  test("Then_the_object_is_equal_to_one_created_with_fullname", () => {
    const anotherPerson = Person.CreateFromFullName("Jimmy Nilsson");
    expect(person).toEqual(anotherPerson);
  });

  test.each([
    [true, "Jimmy", "Nilsson"],
    [false, "???", "Nilsson"],
    [false, "Jimmy", "???"]
  ])(
    "Then_it_is_equal_to_another_object_or_not_depending_on_the_values",
    (expected: boolean, firstName: string, lastName: string) => {
      const anotherPerson = new Person(firstName, lastName);
      expect(person.equal(anotherPerson)).toBe(expected);
    }
  );
});
