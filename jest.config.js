module.exports = {
  roots: ['<rootDir>/packages'],
  collectCoverageFrom: [
    '<rootDir>/packages/**/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
