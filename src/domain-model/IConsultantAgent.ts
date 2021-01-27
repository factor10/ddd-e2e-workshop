import { Guid } from "guid-typescript";
import { Consultant } from ".";

export interface IConsultantAgent {
  theOneWithFullName(fullName: string): Consultant | undefined;
  theOneWithId(id: Guid): Consultant | undefined;
  all(): Array<Consultant>;
}
