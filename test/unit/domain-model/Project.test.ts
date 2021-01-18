import { Guid } from "guid-typescript";
import { Consultant, Customer, Project } from "src/domain-model";

describe("When creating a project", () => {
  const id = Guid.create();
  let project: Project;
  let consultant: Consultant;

  beforeEach(() => {
    const customer = new Customer("Saab");
    project = new Project(customer, "THE app");

    project.addActivity("Programming");

    consultant = new Consultant(id, "Karin", "Andersson");
    project.addConsultant(consultant);
  });

  test("Then the name is set", () => {
    expect(project.name).toBe("THE app");
  });

  test("Then the customer is set", () => {
    expect(project.customer.name).toBe("Saab");
  });

  test("Then there is one activity that is Programming", () => {
    expect(project.activities).toEqual(["Programming"]);
  });

  test("Then there is one consultant named Karin Andersson", () => {
    expect(project.consultants[0].person.fullName).toBe("Karin Andersson");
  });

  test("Then the project is ready to get registrations", () => {
    expect(project.isReadyToGetTimeRegistrations).toBe(true);
  });

  test("Then I can get a snapshot of the project", () => {
    expect(project.takeSnapshot().name).toBe(project.name);
  });
});
