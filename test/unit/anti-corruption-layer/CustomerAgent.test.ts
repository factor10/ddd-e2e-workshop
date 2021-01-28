import { CustomerAgent } from "src/anti-corruption-layer";

describe("When asking for a customer from the domainservice", () => {
  const customerAgent = new CustomerAgent();

  test("Then the customer can be reconstituted", () => {
    const customer = customerAgent.theOneWithName("Sonera");
    expect(customer?.name).toBe("Sonera");
  });

  test("Then customer can not be found for non existing name", () => {
    const consultant = customerAgent.theOneWithName("X");
    expect(consultant).toBeUndefined();
  });
});
