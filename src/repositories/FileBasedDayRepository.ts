import { BaseFileBasedRepository } from "./BaseFileBasedRepository";
import { Consultant, Day, IDayRepository } from "src/domain-model";
import { isSameDate } from "src/shared/functions";
import moment from "moment";

export class FileBasedDayRepository
  extends BaseFileBasedRepository
  implements IDayRepository {
  async save(day: Day): Promise<void> {
    const db = await super.openDb();
    if (!db.days) {
      db.days = [];
    }

    const dayAsJsonFriendly = day.toJSON();
    for (let i = 0; i < db.days.length; i++) {
      const existingDay = Day.fromJsonObject(db.days[i]);
      if (
        day.consultant.equal(existingDay.consultant) &&
        isSameDate(day.date, existingDay.date)
      ) {
        db.days[i] = dayAsJsonFriendly;
        await super.saveDb(db);
        return;
      }
    }

    db.days.push(dayAsJsonFriendly);
    await super.saveDb(db);
  }

  async certainDayForConsultant(
    consultant: Consultant,
    date: Date
  ): Promise<Day | null> {
    const db = await super.openDb();
    for (const dayObject of db.days) {
      const day = Day.fromJsonObject(dayObject);
      if (consultant.equal(day.consultant) && isSameDate(day.date, date)) {
        return day;
      }
    }
    return null;
  }

  async between(start: Date, end: Date): Promise<Day[]> {
    const db = await super.openDb();
    return db.days
      .map(d => Day.fromJsonObject(d))
      .filter((d: Day) => moment(start).startOf("date").toDate() <= d.date)
      .filter((d: Day) => d.date <= moment(end).endOf("date").toDate());
  }

  async all(): Promise<Day[]> {
    const db = await super.openDb();
    return db.days.map(d => Day.fromJsonObject(d));
  }
}
