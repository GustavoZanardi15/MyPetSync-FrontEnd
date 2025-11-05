export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/.jest/mocks/fileMock.js"
    },
    setupFilesAfterEnv: ["<rootDir>/.jest/setup-tests.js"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    coverageDirectory: "coverage",
    collectCoverageFrom: [
      "src/**/*.{js,jsx}",
      "!src/main.jsx",
      "!src/vite-env.d.ts"
    ]
  };
  