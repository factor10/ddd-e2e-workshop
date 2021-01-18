import { Customer, Duration, Project, Registration } from "src/domain-model";

describe("When_creating_a_registration", () => {
  let registration: Registration;

  beforeEach(() => {
    const project = new Project(new Customer("Ikea"), "X");
    registration = new Registration(
      Duration.Create("3:00"),
      "Programming",
      project
    );
  });

  test("Then_the_hours_is_set", () => {
    expect(registration.duration.hours).toBe(3);
  });

  test("Then_the_activity_is_set", () => {
    expect(registration.activity).toBe("Programming");
  });

  test("Then_the_project_is_set", () => {
    expect(registration.projectSnapshot.name).toBe("X");
  });
});
