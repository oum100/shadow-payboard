import { describe, expect, test, jest } from "@jest/globals";
import { add } from "./sum";

describe("add Module", () => {
  test("add 1+2 equal 3", () => {
    expect(add(1, 2)).toEqual(3);
  });
});
