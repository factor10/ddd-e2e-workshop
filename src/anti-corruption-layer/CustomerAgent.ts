import { Customer, ICustomerAgent } from "src/domain-model";

export class CustomerAgent implements ICustomerAgent {
  private customerMap: Map<string, Customer> = new Map<string, Customer>();

  constructor() {
    this.createFakeCustomer("factor10");
    this.createFakeCustomer("Acme");
  }

  private createFakeCustomer(name: string) {
    this.customerMap.set(name, new Customer(name));
  }

  theOneWithName(name: string): Customer | undefined {
    return this.customerMap.get(name);
  }
}
