import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wordupAfrica.bibleReader',
  appName: 'WordUp Africa Bible Reader',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    buildOptions: {
      keystorePath: 'release.keystore',
      keystoreAlias: 'wordupAfrica',
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#EADFCA',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#FFFFFF',
    },
  },
};

export default config;
