/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  forceExit: true,
  testMatch: ['**/**/*.test.ts'],
  testTimeout: 70000,
  maxWorkers: 1
};