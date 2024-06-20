const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    extraNodeModules: {
      'websocket': require.resolve('react-native-stomp-websocket/node_modules/websocket')
    }
  },
  ...defaultConfig
};
