import { Consultant, Day, IDayRepository } from "src/domain-model";

export class FakeDayRepo implements IDayRepository {
  public days = new Array<Day>();

  save(day: Day): Promise<void> {
    this.days.push(day);
    return Promise.resolve();
  }

  all(): Promise<Day[]> {
    return Promise.resolve(this.days);
  }

  certainDayForConsultant(
    consultant: Consultant,
    date: Date
  ): Promise<Day | null> {
    throw new Error("Method not implemented.");
  }

  between(start: Date, end: Date): Promise<Day[]> {
    throw new Error("Method not implemented.");
  }
}
