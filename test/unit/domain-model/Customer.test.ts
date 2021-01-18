import { Customer } from "src/domain-model";

describe("When creating a customer", () => {
  let customer: Customer;

  beforeEach(() => {
    customer = new Customer("Nokia");
  });

  test("Then the name is set", () => {
    expect(customer.name).toBe("Nokia");
  });

  test.each([
    [true, "Nokia"],
    [false, "Ericsson"]
    //[false, undefined],
  ])(
    "Then it is equal to another object or not depending on the value",
    (expected: boolean, name: string) => {
      const anotherCustomer = new Customer(name);
      expect(customer.equal(anotherCustomer)).toBe(expected);
    }
  );
});
