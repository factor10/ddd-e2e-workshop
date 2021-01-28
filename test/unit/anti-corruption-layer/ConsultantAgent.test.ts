import { Guid } from "guid-typescript";
import { ConsultantAgent } from "src/anti-corruption-layer";
import { Consultant } from "src/domain-model";

describe("When asking for a consultant from the domainservice", () => {
  const consultantAgent = new ConsultantAgent();

  test("Then the consultant can be reconstituted", () => {
    const consultant = consultantAgent.theOneWithFullName("Stina Johansson");
    expect(consultant?.person.fullName).toBe("Stina Johansson");
  });

  test("Then consultant can not be found for non existing name", () => {
    const consultant = consultantAgent.theOneWithFullName("X Y");
    expect(consultant).toBeUndefined();
  });

  test("Then can get all consultants", () => {
    const consultants = consultantAgent.all();
    const fullNameList = consultants.map((c: Consultant) => c.person.fullName);
    expect(fullNameList).toEqual([
      "Per Persson",
      "Stina Johansson",
      "Bruce Wayne"
    ]);
  });

  test("Then the consultant can be reconstituted by id", () => {
    const consultant = consultantAgent.theOneWithId(
      Guid.parse("c10d7a1d-798e-cb7e-81c7-a3b8de5d3720")
    );
    expect(consultant?.person.fullName).toBe("Stina Johansson");
  });

  test("Then consultant can not be found for non existing name", () => {
    const consultant = consultantAgent.theOneWithId(
      Guid.parse("00000000-0000-0000-0000-000000000000")
    );
    expect(consultant).toBeUndefined();
  });
});
