/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  globals:{
    'ts-jest':{
      tsconfig: 'tsconfig.jest.json'
    }
  },
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },

};