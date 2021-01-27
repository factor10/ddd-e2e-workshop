import { getMockReq, getMockRes } from "@jest-mock/express";
import { Guid } from "guid-typescript";
import { RegistrationController } from "src/api-controllers";
import { FakeDayRepo } from "src/infrastructure-fake/FakeDayRepo";

describe("Given a RegistrationController and an empty Day repository", () => {
  let fakeDaysRepo: FakeDayRepo;
  let controller: RegistrationController;
  beforeEach(() => {
    fakeDaysRepo = new FakeDayRepo();
    controller = new RegistrationController(fakeDaysRepo);
  });

  let response: any;

  describe("When adding a registration for 200 min Programming @ New app", () => {
    beforeEach(async () => {
      const req = getMockReq();
      response = getMockRes().res;
      req.body = {
        registration: {
          consultantId: "11edb330-6b82-bc0a-a509-00340fd7125f",
          date: "1985-11-08",
          project: "New app",
          activity: "Programming",
          duration: "200 min"
        }
      };

      await controller.addRegistration(req, response);
    });

    test("Then repo has one new day", () => {
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

    test("Then the day in repo has one registration", () => {
      expect(fakeDaysRepo.days[0].registrations.length).toBe(1);
    });

    test("Then the registration should have duration 200 min", () => {
      expect(fakeDaysRepo.days[0].registrations[0].duration.minutes).toEqual(
        200
      );
    });

    test("Then the registration should be for project New app", () => {
      expect(
        fakeDaysRepo.days[0].registrations[0].projectSnapshot.name
      ).toEqual("New app");
    });

    test("Then the registration should be for activity Programming", () => {
      expect(fakeDaysRepo.days[0].registrations[0].activity).toEqual(
        "Programming"
      );
    });
  });
});
