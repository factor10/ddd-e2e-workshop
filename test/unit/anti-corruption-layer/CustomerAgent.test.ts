import { CustomerAgent } from "src/anti-corruption-layer";

describe("Given a customer domain service", () => {
  const customerAgent = new CustomerAgent();
  describe("When asking for a customer by name", () => {
    test("Then the customer can be reconstituted", () => {
      const customer = customerAgent.theOneWithName("factor10");
      expect(customer?.name).toBe("factor10");
    });

    test("Then customer can not be found for non existing name", () => {
      const consultant = customerAgent.theOneWithName("X");
      expect(consultant).toBeUndefined();
    });
  });
});
