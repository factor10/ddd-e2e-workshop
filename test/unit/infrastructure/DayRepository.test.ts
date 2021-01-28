import { Guid } from "guid-typescript";
import { ConsultantAgent } from "src/anti-corruption-layer";
import {
  Consultant,
  Customer,
  Day,
  DayState,
  Duration,
  Project,
  Registration
} from "src/domain-model";
import { FileBasedDayRepository } from "src/infrastructure";
import { isSameDate } from "src/shared/functions";

describe("When saving days", () => {
  const dayRepository = new FileBasedDayRepository();
  const today = new Date();
  const consultantStina = <Consultant>(
    new ConsultantAgent().theOneWithFullName("Stina Johansson")
  );

  beforeAll(async () => {
    dayRepository.clearDatabase();

    const firstDay = new Day(consultantStina, today, DayState.Closed);
    firstDay.addRegistration(
      new Registration(
        new Duration(60),
        "Programming",
        new Project(new Customer("Volvo"), "New app")
      )
    );
    await dayRepository.save(firstDay);

    const fourDaysAhead = new Date();
    fourDaysAhead.setDate(fourDaysAhead.getDate() + 4);
    const secondDay = new Day(consultantStina, fourDaysAhead);
    await dayRepository.save(secondDay);
  });

  test("Then the first day can be reconstituted", async () => {
    const day = await dayRepository.certainDayForConsultant(
      consultantStina,
      today
    );
    expect(day).not.toBeNull();
    expect(day?.date).toEqual(today);
    expect(day?.consultant).toEqual(consultantStina);
    expect(day?.registrations[0].projectSnapshot.name).toBe("New app");
    expect(day?.state).toBe(DayState.Closed);
  });

  test("Then the second day can be reconstituted", async () => {
    const fourDaysAhead = new Date();
    fourDaysAhead.setDate(fourDaysAhead.getDate() + 4);
    const day = await dayRepository.certainDayForConsultant(
      consultantStina,
      fourDaysAhead
    );
    expect(day).not.toBeNull();
    expect(isSameDate(<Date>day?.date, fourDaysAhead)).toBe(true);
    expect(day?.consultant).toEqual(consultantStina);
    expect(day?.registrations).toEqual([]);
    expect(day?.state).toBe(DayState.Open);
  });

  test("Then the first day can be updated and reconstitued", async () => {
    const day = <Day>(
      await dayRepository.certainDayForConsultant(consultantStina, today)
    );
    day.addRegistration(
      new Registration(
        new Duration(120),
        "Programming",
        new Project(new Customer("Volvo"), "New app")
      )
    );
    await dayRepository.save(day);

    const updatedDay = await dayRepository.certainDayForConsultant(
      consultantStina,
      today
    );
    expect(updatedDay?.hours).toBe(3);
  });

  test("Then day can not be found for non existing consultant", async () => {
    const day = await dayRepository.certainDayForConsultant(
      new Consultant(Guid.create(), "Non", "Existing"),
      today
    );
    expect(day).toBeNull();
  });

  test("Then day can not be found for non existing date", async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const day = await dayRepository.certainDayForConsultant(
      consultantStina,
      yesterday
    );
    expect(day).toBeNull();
  });

  test("Then the first day can be found in the interval", async () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const threeDaysAhead = new Date();
    threeDaysAhead.setDate(threeDaysAhead.getDate() + 3);

    const resultDates = (
      await dayRepository.between(twoDaysAgo, threeDaysAhead)
    ).map(d => d.date);
    expect(resultDates.length).toBe(1);
    expect(isSameDate(today, resultDates[0])).toBe(true);
  });
});
