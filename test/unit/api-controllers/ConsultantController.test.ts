import { getMockReq, getMockRes } from "@jest-mock/express";
import { getAllConsultants } from "src/api-controllers";

describe("When getting all consultants from controller", () => {
  let response: any;
  beforeEach(() => {
    response = getMockRes().res;
    getAllConsultants(getMockReq(), response);
  });

  test("Then HTTP status should be OK", () => {
    expect(response.status).toHaveBeenCalledWith(200);
  });

  test("Then the response contains three consultants", () => {
    const consultants = response.json.mock.calls[0][0].consultants;
    expect(consultants.length).toBe(3);
  });
});
