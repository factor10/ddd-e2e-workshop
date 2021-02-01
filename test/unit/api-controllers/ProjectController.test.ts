import { getMockReq, getMockRes } from "@jest-mock/express";
import { ConsultantAgent } from "src/anti-corruption-layer";
import { ProjectController } from "src/api-controllers";
import { FakeProjectRepository } from "src/infrastructure";

describe("Given a consultant (Stina) with two projects", () => {
  let controller: ProjectController;
  beforeEach(() => {
    const projectRepository = new FakeProjectRepository();
    const consultantAgent = new ConsultantAgent();
    controller = new ProjectController(projectRepository, consultantAgent);
  });

  let projects: any[];

  describe("When getting all projects for Stina", () => {
    beforeEach(async () => {
      const req = getMockReq();
      req.params.consultantId = "c10d7a1d-798e-cb7e-81c7-a3b8de5d3720";
      const res: any = getMockRes().res;

      await controller.getAllForConsultant(req, res);
      projects = res.json.mock.calls[0][0].projects;
    });

    test.each(["New app", "DDD presentation"])(
      "Then projects should contain '%s'",
      (projectName: string) => {
        expect(projects.map(p => p.name)).toContain(projectName);
      }
    );
  });
});
