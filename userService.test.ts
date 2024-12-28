import { describe, expect, test, jest } from "@jest/globals";
import * as userService from './userService';

jest.spyOn(userService, 'getUser').mockReturnValue({ id: 1, name: 'Mocked User' });

test('mock getUser only', () => {
  expect(userService.getUser(1)).toEqual({ id: 1, name: 'Mocked User' });
  expect(userService.saveUser({ id: 1, name: 'User' })).toBe(true); // Not mocked
});
