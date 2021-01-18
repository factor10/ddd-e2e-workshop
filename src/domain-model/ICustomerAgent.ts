import { Customer } from ".";

export interface ICustomerAgent {
  theOneWithName(name: string): Customer | undefined;
}
