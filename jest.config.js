/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/src/tests/setEnvVars.js"],
  "roots": [
    "<rootDir>/src"
  ],
};