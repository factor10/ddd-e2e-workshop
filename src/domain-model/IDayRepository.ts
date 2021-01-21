import { Consultant, Day } from ".";

export interface IDayRepository {
  save(day: Day): Promise<void>;

  certainDayForConsultant(
    consultant: Consultant,
    date: Date
  ): Promise<Day | null>;

  between(start: Date, end: Date): Promise<Array<Day>>;

  all(): Promise<Array<Day>>;
}
