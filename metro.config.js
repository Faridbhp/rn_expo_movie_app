const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

// Metro configuration for firebase expo
// belum diperlukan, karena kalaupun tidak ada ini, tetap bisa jalan
// config.resolver.sourceExts.push('cjs');
// config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: './app/global.css' })