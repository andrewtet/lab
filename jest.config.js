module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapping: {
    "^~/(.*)$": "<rootDir>/app/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: [
    "**/__tests__/**/*.(ts|tsx)",
    "**/*.(test|spec).(ts|tsx)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};