import { Consultant } from ".";

export interface IConsultantAgent {
  theOneWithFullName(fullName: string): Consultant | undefined;
}
