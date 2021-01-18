import { ConsultantAgent } from "src/anti-corruption-layer";

describe("When_asking_for_a_consultant_from_the_domainservice", () => {
  const consultantAgent = new ConsultantAgent();

  test("Then_the_consultant_can_be_reconstituted", () => {
    const consultant = consultantAgent.theOneWithFullName("Stina Johansson");
    expect(consultant?.person.fullName).toBe("Stina Johansson");
  });

  test("Then_consultant_can_not_be_found_for_non_existing_name", () => {
    const consultant = consultantAgent.theOneWithFullName("X Y");
    expect(consultant).toBeUndefined();
  });
});
