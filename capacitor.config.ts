import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wordupafrica.biblereader',
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
    limitsNavigationsToAppBoundDomains: true,
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
