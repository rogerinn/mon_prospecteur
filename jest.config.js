module.exports = {
  roots: ['<rootDir>/'],
  collectCoverageFrom: [
    '<rootDir>/products/**/**/*.ts',
    '<rootDir>/libs/**/**/*.ts'
  ],
  preset: '@shelf/jest-mongodb',
  coverageDirectory: '<rootDir>/coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1'
  }
}
