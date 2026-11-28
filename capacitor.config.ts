import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.leyesapps.bibleapp',
  appName: 'Bible in African Languages',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    buildOptions: {
      keystorePath: 'release.keystore',
      keystoreAlias: 'my-key-alias',
    },
  },
  ios: {
    scheme: 'App',
    webContentsDebuggingEnabled: false,
    // Set to false to allow fetch requests to external domains (worker API)
    // If you want to keep this true, you must add the worker domain to
    // WKAppBoundDomains in the Xcode project's Info.plist
    limitsNavigationsToAppBoundDomains: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#EADFCA',
      androidSplashResourceName: 'splash',
      showSpinner: false,
      iosScaleType: 'ASPECT_FILL',
      launchAutoHide: true,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#FFFFFF',
      overlays: true,
    },
  },
};

export default config;
