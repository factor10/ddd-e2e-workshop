import { Customer, ICustomerAgent } from "src/domain-model";

export class CustomerAgent implements ICustomerAgent {
  private customerMap: Map<string, Customer> = new Map<string, Customer>();

  constructor() {
    const sonera = new Customer("Sonera");
    this.customerMap.set(sonera.name, sonera);

    const finnair = new Customer("Finnair");
    this.customerMap.set(finnair.name, finnair);
  }

  theOneWithName(name: string): Customer | undefined {
    return this.customerMap.get(name);
  }
}
