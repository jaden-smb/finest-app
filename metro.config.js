const { getDefaultConfig } = require('expo/metro-config');
const os = require('os');

// Polyfill for os.availableParallelism which is not available in Node.js 22
if (!os.availableParallelism) {
  os.availableParallelism = () => os.cpus().length;
}

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix for Node.js 22 compatibility
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;
