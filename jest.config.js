module.exports = {
  roots: ['<rootDir>/'],
  collectCoverageFrom: [
    '<rootDir>/products/**/**/*.ts',
    '<rootDir>/libs/**/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1'
  }
}
