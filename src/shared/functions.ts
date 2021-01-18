import logger from "./Logger";

export const pErr = (err: Error) => {
  if (err) {
    logger.err(err);
  }
};

export const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
