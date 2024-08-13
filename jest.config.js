module.exports = {
  roots: ["<rootDir>/src/__tests__"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)", // Ignore all node_modules except for axios
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|scss)$":
      "<rootDir>/src/__mocks__/fileMock/fileMock.js",
      "^axios$": "axios/dist/node/axios.cjs" 

  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};