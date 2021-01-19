import { Consultant } from ".";

export interface IConsultantAgent {
  theOneWithFullName(fullName: string): Consultant | undefined;
  theOneWithId(id: string): Consultant | undefined;
  all(): Array<Consultant>;
}
