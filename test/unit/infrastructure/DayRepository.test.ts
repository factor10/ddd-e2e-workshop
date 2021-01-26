import { Guid } from "guid-typescript";
import { ConsultantAgent } from "src/anti-corruption-layer";
import {
  Consultant,
  Customer,
  Day,
  Duration,
  Project,
  Registration
} from "src/domain-model";
import { BaseFileBasedRepository } from "src/infrastructure/BaseFileBasedRepository";
import { FileBasedDayRepository } from "src/infrastructure";
import { isSameDate } from "src/shared/functions";

describe("When_saving_days", () => {
  const dayRepository = new FileBasedDayRepository();
  const today = new Date();
  const consultantStina = <Consultant>(
    new ConsultantAgent().theOneWithFullName("Stina Johansson")
  );

  beforeAll(async () => {
    BaseFileBasedRepository.clearDatabase();

    const firstDay = new Day(consultantStina, today);
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

  test("Then_the_first_day_can_be_reconstituted", async () => {
    const day = await dayRepository.certainDayForConsultant(
      consultantStina,
      today
    );
    expect(day).not.toBeNull();
    expect(day?.date).toEqual(today);
    expect(day?.consultant).toEqual(consultantStina);
    expect(day?.registrations[0].projectSnapshot.name).toBe("New app");
  });

  test("Then_the_second_day_can_be_reconstituted", async () => {
    const fourDaysAhead = new Date();
    fourDaysAhead.setDate(fourDaysAhead.getDate() + 4);
    const day = await dayRepository.certainDayForConsultant(
      consultantStina,
      fourDaysAhead
    );
    expect(day).not.toBeNull();
    expect(isSameDate(<Date>day?.date, fourDaysAhead)).toBe(true);
    expect(day?.consultant).toEqual(consultantStina);
  });

  test("Then_the_first_day_can_be_updated_and_reconstitued", async () => {
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

  test("Then_day_can_not_be_found_for_non_existing_consultant", async () => {
    const day = await dayRepository.certainDayForConsultant(
      new Consultant(Guid.create(), "Non", "Existing"),
      today
    );
    expect(day).toBeNull();
  });

  test("Then_day_can_not_be_found_for_non_existing_date", async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const day = await dayRepository.certainDayForConsultant(
      consultantStina,
      yesterday
    );
    expect(day).toBeNull();
  });

  test("Then_the_first_day_can_be_found_in_the_interval", async () => {
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
