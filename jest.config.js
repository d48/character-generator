module.exports = {
  verbose: true,
  // setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js",
  },
  "collectCoverageFrom": [
      "src/components/**/*.{js,jsx}",
      "src/plugins/**/*.{js,jsx}",
      "src/utils/**/*.{js,jsx}"
    ],
    "coveragePathIgnorePatterns": [
      "test-utils.js"
    ],
    "coverageReporters": [
      "json-summary",
      "text"
    ]

};
