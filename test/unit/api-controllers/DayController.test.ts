import { getMockReq, getMockRes } from "@jest-mock/express";
import { Guid } from "guid-typescript";
import { DayController } from "src/api-controllers";
import { Consultant, Day } from "src/domain-model";
import { FakeDayRepository } from "../infrastructure-fake/FakeDayRepository";

describe("Given a DayController", () => {
  let fakeDaysRepository: FakeDayRepository;
  let dayController: DayController;
  beforeEach(() => {
    fakeDaysRepository = new FakeDayRepository();
    dayController = new DayController(fakeDaysRepository);
  });

  let response: any;

  describe("Given one day in repository", () => {
    beforeEach(() => {
      fakeDaysRepository.save(
        new Day(new Consultant(Guid.create(), "Kevin", "B"), new Date())
      );
    });

    describe("When getting all days from controller", () => {
      beforeEach(async () => {
        response = getMockRes().res;
        await dayController.getAllDays(getMockReq(), response);
      });

      test("Then HTTP status should be OK", () => {
        expect(response.status).toHaveBeenCalledWith(200);
      });

      test("Then the response contain a day", () => {
        const days = response.json.mock.calls[0][0].days;
        expect(days.length).toBe(1);
      });

      test("Then the days consultant is Kevin B", () => {
        const days = response.json.mock.calls[0][0].days;
        expect(days[0].consultant.person.fullName).toBe("Kevin B");
      });
    });
  });
});
