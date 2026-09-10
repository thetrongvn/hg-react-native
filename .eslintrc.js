module.exports = {
  root: true,
  extends: ['@react-native'],
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'android/',
    'ios/',
    'vendor/',
  ],
  rules: {
    'react/no-unstable-nested-components': ['error', {allowAsProps: true}],
  },
  overrides: [
    {
      files: ['jest.setup.js', 'jest.config.js'],
      env: {jest: true, node: true},
    },
  ],
};
