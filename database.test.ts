import { describe, expect, test, jest } from "@jest/globals";
import {Database} from './database';

jest.mock('./database'); // Mock the entire Database class


test('mocks Database class instance', () => {
  const MockedDatabase = Database as jest.MockedClass<typeof Database>;
  
  
  const dbInstance = new MockedDatabase();
  dbInstance.connect.mockReturnValue('Mocked Connected');
  
  
  expect(dbInstance.connect()).toBe('Mocked Connected');
});


// import { Database } from './database';

// // Mock the entire Database class
// jest.mock('./database');

// describe('Database class tests', () => {
//   let MockedDatabase: jest.MockedClass<typeof Database>;

//   beforeEach(() => {
//     // Type the Database class as a mocked class
//     MockedDatabase = Database as jest.MockedClass<typeof Database>;
//   });

//   test('mocks async connect method', async () => {
//     const dbInstance = new MockedDatabase();

//     // Mocking the asynchronous connect method
//     dbInstance.connect.mockResolvedValue('Mocked Connected');
    
//     // Testing the mocked async method
//     await expect(dbInstance.connect()).resolves.toBe('Mocked Connected');
//   });

//   test('mocks sync disconnect method', () => {
//     const dbInstance = new MockedDatabase();

//     // Mocking the synchronous disconnect method
//     dbInstance.disconnect.mockReturnValue('Mocked Disconnected');
    
//     // Testing the mocked sync method
//     expect(dbInstance.disconnect()).toBe('Mocked Disconnected');
//   });
// });

