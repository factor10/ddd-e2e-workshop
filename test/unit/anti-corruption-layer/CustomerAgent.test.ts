import { CustomerAgent } from "src/anti-corruption-layer";

describe("When_asking_for_a_customer_from_the_domainservice", () => {
  const customerAgent = new CustomerAgent();

  test("Then_the_customer_can_be_reconstituted", () => {
    const customer = customerAgent.theOneWithName("Sonera");
    expect(customer?.name).toBe("Sonera");
  });

  test("Then_customer_can_not_be_found_for_non_existing_name", () => {
    const consultant = customerAgent.theOneWithName("X");
    expect(consultant).toBeUndefined();
  });
});
