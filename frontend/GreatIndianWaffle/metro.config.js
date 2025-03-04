const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const { resolver: { sourceExts, assetExts } } = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-web/transformer'),
  },
  resolver: {
    assetExts: [...assetExts, 'ttf', 'otf'],
    sourceExts: [...sourceExts, 'web.js', 'js', 'jsx', 'json', 'ts', 'tsx'],
    platforms: ['web', 'ios', 'android'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
