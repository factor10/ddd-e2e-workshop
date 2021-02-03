import { getMockReq, getMockRes } from "@jest-mock/express";
import { ConsultantAgent } from "src/anti-corruption-layer";
import { ConsultantController } from "src/api-controllers";
import { FakeProjectRepository } from "src/infrastructure";

describe("Given a ConsultantController", () => {
  let controller: ConsultantController;
  beforeEach(() => {
    const projectRepository = new FakeProjectRepository();
    const consultantAgent = new ConsultantAgent();
    controller = new ConsultantController(consultantAgent, projectRepository);
  });

  describe("When getting all consultants from controller", () => {
    let response: any;
    beforeEach(() => {
      response = getMockRes().res;
      controller.getAllConsultants(getMockReq(), response);
    });

    test("Then HTTP status should be OK", () => {
      expect(response.status).toHaveBeenCalledWith(200);
    });

    test("Then the response contains three consultants", () => {
      const consultants = response.json.mock.calls[0][0].consultants;
      expect(consultants.length).toBe(3);
    });
  });

  describe("Given a consultant (Stina) with two projects", () => {
    let projects: any[];

    describe("When getting all projects for Stina", () => {
      beforeEach(async () => {
        const req = getMockReq();
        req.params.consultantId = "c10d7a1d-798e-cb7e-81c7-a3b8de5d3720";
        const res: any = getMockRes().res;

        await controller.getProjectsForConsultant(req, res);
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
});
