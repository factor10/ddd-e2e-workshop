import { getMockReq, getMockRes } from "@jest-mock/express";
import { ConsultantAgent } from "src/anti-corruption-layer";
import { ConsultantController } from "src/api-controllers";

describe("Given a ConsultantController", () => {
  let controller: ConsultantController;
  beforeEach(() => {
    controller = new ConsultantController(new ConsultantAgent());
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
});
