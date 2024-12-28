import { describe, expect, test, jest } from "@jest/globals";

import { delay } from './timerUtils';

jest.useFakeTimers();

test('mocks setTimeout', () => {
  const mockCallback = jest.fn();
  delay(mockCallback, 1000);

  // Fast-forward until all timers are executed
  jest.runAllTimers();

  expect(mockCallback).toHaveBeenCalled();
});
