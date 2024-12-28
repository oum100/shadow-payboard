import { describe, expect, test, jest } from "@jest/globals";
import * as mathUtils from './mathUtils';

jest.mock('./mathUtils'); // Mock the entire module

test('mocks add function', () => {
    const mockedAdd = mathUtils.add as jest.Mock;

    mockedAdd.mockReturnValue(10);

    expect(mathUtils.add(2,3)).toBe(10);
})