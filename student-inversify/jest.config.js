module.exports = {
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'json'],

  // A preset that is used as a base for Jest's configuration
  preset: '@shelf/jest-mongodb',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    // '**/?(*.)+(spec|test).js?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  // Timeout of a test in milliseconds.
  testTimeout: 20000,
};