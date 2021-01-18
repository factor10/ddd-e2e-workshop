import { Duration } from "src/domain-model";

describe("DurationTests", () => {
  test("When creating a duration from minutes string", () => {
    const duration = Duration.Create("30 min");
    expect(duration.minutes).toBe(30);
  });

  test("When creating a duration from decimal string", () => {
    const duration = Duration.Create("0.5");
    expect(duration.minutes).toBe(30);
  });

  test("When creating a duration from colon string", () => {
    const duration = Duration.Create("0:30");
    expect(duration.minutes).toBe(30);
  });
});
