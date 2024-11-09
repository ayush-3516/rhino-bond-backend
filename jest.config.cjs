module.exports = {
  transform: {
    '^.+\\.(t|j)s$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testMatch: ['**/*.test.ts', '**/*.test.js'],
  transformIgnorePatterns: ['/node_modules/(?!@nestjs)'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
