const config = require('kcd-scripts/jest')

module.exports = {
  ...config,
  setupFilesAfterEnv: ['<rootDir>/tests/setup-env.js'],
  coverageThreshold: {},
}
