import { getMockReq, getMockRes } from "@jest-mock/express";
import { Guid } from "guid-typescript";
import { DayController } from "src/api-controllers";
import { Consultant, Day } from "src/domain-model";
import { FakeDayRepo } from "src/infrastructure-fake/FakeDayRepo";

describe("Given a DayController", () => {
  let fakeDaysRepo: FakeDayRepo;
  let dayController: DayController;
  beforeEach(() => {
    fakeDaysRepo = new FakeDayRepo();
    dayController = new DayController(fakeDaysRepo);
  });

  let response: any;

  describe("Given one day in repository", () => {
    beforeEach(() => {
      fakeDaysRepo.save(
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

  describe("When adding a day to empty repository", () => {
    beforeEach(async () => {
      const req = getMockReq();
      response = getMockRes().res;
      req.body = {
        day: {
          consultantId: "11edb330-6b82-bc0a-a509-00340fd7125f",
          date: "1985-11-08"
        }
      };

      await dayController.addDay(req, response);
    });

    test("Then repos has one new day", () => {
      expect(fakeDaysRepo.days.length).toBe(1);
    });

    test("Then day in repository has the given consultant ID", () => {
      expect(fakeDaysRepo.days[0].consultant.id).toEqual(
        Guid.parse("11edb330-6b82-bc0a-a509-00340fd7125f")
      );
    });

    test("Then day in repository has the given date", () => {
      expect(fakeDaysRepo.days[0].date.toISOString().substr(0, 10)).toEqual(
        "1985-11-08"
      );
    });
  });
});
