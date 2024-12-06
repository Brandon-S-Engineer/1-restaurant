export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use Babel for JavaScript files
  },
  testEnvironment: 'jest-environment-jsdom', // Use jsdom for DOM-based tests
};
