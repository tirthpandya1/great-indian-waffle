module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      ['module-resolver', {
        alias: {
          '^react-native$': 'react-native-web'
        }
      }]
    ]
  };
};
