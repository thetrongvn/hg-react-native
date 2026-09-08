module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
        root: ['.'],
        alias: {
          '@rootDir': '.',
          '@assets': './assets',
          '@src': './src',
          '@app': './src/app',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@i18n': './src/i18n/index.ts',
          '@theme': './src/theme',
          '@types': './src/types',
          '@components': './src/components',
          '@redux': './src/redux',
          '@features': './src/features',
          '@core': './src/core',
          '@services': './src/core/services',
          '@models': './src/core/models',
          '@apis': './src/core/api',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@styles': './src/styles',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
