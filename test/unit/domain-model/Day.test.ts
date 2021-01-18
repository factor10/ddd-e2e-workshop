import { Guid } from "guid-typescript";
import { Consultant, Day, Duration, Registration } from "src/domain-model";

describe("When creating a day", () => {
  let id: Guid;
  let day: Day;
  let now: Date;
  let consultant: Consultant;
  let r1: Registration;
  let r2: Registration;

  beforeEach(() => {
    id = Guid.create();
    now = new Date();
    consultant = new Consultant(id, "Pelle", "Svensson");
    day = new Day(consultant, now);

    r1 = new Registration(Duration.Create("2:00"), "Advicing");
    r2 = new Registration(Duration.Create("3:00"), "Debugging");
    day.addRegistration(r1);
    day.addRegistration(r2);
  });

  test("Then the date is set", () => {
    expect(day.date).toBe(now);
  });

  test("Then the consultant is set", () => {
    expect(day.consultant).toBe(consultant);
  });

  test("Then there will be two registrations", () => {
    expect(day.registrations.length).toBe(2);
    expect(day.registrations).toContain(r1);
    expect(day.registrations).toContain(r2);
  });

  test("Then the total numbers of hours on that day will be 5", () => {
    expect(day.hours).toBe(5);
  });
});
