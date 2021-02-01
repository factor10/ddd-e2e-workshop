import { Customer, Duration, Project, Registration } from "src/domain-model";

describe("When creating a registration", () => {
  let registration: Registration;

  beforeEach(() => {
    const project = new Project(new Customer("Ikea"), "X");
    registration = new Registration(
      Duration.Create("3:00"),
      "Programming",
      project
    );
  });

  test("Then the hours is set", () => {
    expect(registration.duration.hours).toBe(3);
  });

  test("Then the activity is set", () => {
    expect(registration.activity).toBe("Programming");
  });

  test("Then the project is set", () => {
    expect(registration.projectSnapshot.name).toBe("X");
  });
});
