import { describe, expect, test, jest } from "@jest/globals";

const mockFn = jest
  .fn()
  .mockReturnValueOnce("First Call")
  .mockReturnValueOnce("Second Call")
  .mockReturnValue("Default");

test("mocks with multiple return values", () => {
  expect(mockFn()).toBe("First Call"); // First call
  expect(mockFn()).toBe("Second Call"); // Second call
  expect(mockFn()).toBe("Default"); // All subsequent calls
});
