import { getMockReq, getMockRes } from "@jest-mock/express";
import { Guid } from "guid-typescript";
import { ConsultantAgent } from "src/anti-corruption-layer";
import { DayController } from "src/api-controllers";
import { Consultant, Day } from "src/domain-model";
import { FakeProjectRepository } from "src/infrastructure";
import { FakeDayRepository } from "../infrastructure-fake/FakeDayRepository";

describe("Given a DayController", () => {
  let fakeDaysRepository: FakeDayRepository;
  let controller: DayController;

  beforeEach(() => {
    fakeDaysRepository = new FakeDayRepository();
    const consultantAgent = new ConsultantAgent();
    const projectRepo = new FakeProjectRepository();
    controller = new DayController(
      fakeDaysRepository,
      consultantAgent,
      projectRepo
    );
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
        await controller.getAllDays(getMockReq(), response);
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

  describe("Given an empty Day repository", () => {
    describe("When adding a registration for 200 min Programming @ New app", () => {
      beforeEach(async () => {
        const req = getMockReq();
        response = getMockRes().res;
        req.params = {
          consultantId: "11edb330-6b82-bc0a-a509-00340fd7125f",
          date: "1985-11-08"
        };
        req.body = {
          registration: {
            projectName: "New app",
            activity: "Programming",
            duration: "200 min"
          }
        };

        await controller.addRegistration(req, response);
      });

      test("Then repo has one new day", () => {
        expect(fakeDaysRepository.days.length).toBe(1);
      });

      test("Then day in repository has the given consultant ID", () => {
        expect(fakeDaysRepository.days[0].consultant.id).toEqual(
          Guid.parse("11edb330-6b82-bc0a-a509-00340fd7125f")
        );
      });

      test("Then day in repository has the given date", () => {
        expect(
          fakeDaysRepository.days[0].date.toISOString().substr(0, 10)
        ).toEqual("1985-11-08");
      });

      test("Then the day in repo has one registration", () => {
        expect(fakeDaysRepository.days[0].registrations.length).toBe(1);
      });

      test("Then the registration should have duration 200 min", () => {
        expect(
          fakeDaysRepository.days[0].registrations[0].duration.minutes
        ).toEqual(200);
      });

      test("Then the registration should be for project New app", () => {
        expect(
          fakeDaysRepository.days[0].registrations[0].projectSnapshot.name
        ).toEqual("New app");
      });

      test("Then the registration should be for activity Programming", () => {
        expect(fakeDaysRepository.days[0].registrations[0].activity).toEqual(
          "Programming"
        );
      });
    });
  });
});
