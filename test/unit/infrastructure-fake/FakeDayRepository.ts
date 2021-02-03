import { Consultant, Day, IDayRepository } from "src/domain-model";

export class FakeDayRepository implements IDayRepository {
  public days = new Array<Day>();

  async save(day: Day) {
    const maybeDay = await this.certainDayForConsultant(
      day.consultant,
      day.date
    );
    if (maybeDay) {
      this.days[this.days.indexOf(maybeDay)] = day;
    } else {
      this.days.push(day);
    }
  }

  all(): Promise<Day[]> {
    return Promise.resolve(this.days);
  }

  certainDayForConsultant(
    consultant: Consultant,
    date: Date
  ): Promise<Day | null> {
    return Promise.resolve(
      this.days.find(
        day => day.consultant.equal(consultant) && day.isSameDate(date)
      ) ?? null
    );
  }

  between(start: Date, end: Date): Promise<Day[]> {
    return Promise.resolve(
      this.days.filter((d: Day) => d.isBetween(start, end))
    );
  }
}
