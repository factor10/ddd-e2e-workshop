import { ConsultantAgent } from "src/anti-corruption-layer";
import { Consultant, Project } from "src/domain-model";
import { FakeProjectRepository } from "src/infrastructure";

describe("Given a project repository with one project", () => {
  describe("When getting project for consultant Stina Johansson", () => {
    const repository = new FakeProjectRepository();

    let projects: Array<Project>;

    beforeAll(async () => {
      const stina = <Consultant>(
        new ConsultantAgent().theOneWithFullName("Stina Johansson")
      );
      projects = await repository.projectsForConsultant(stina);
    });

    test("Then two projects are returned", () => {
      expect(projects.length).toBe(2);
    });

    test.each(["New app", "DDD presentation"])(
      "Then projects contains '%s'",
      (projectName: string) => {
        expect(projects.map(p => p.name)).toContain(projectName);
      }
    );
  });
});
