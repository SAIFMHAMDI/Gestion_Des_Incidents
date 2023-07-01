import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'saveme.app.sh',
  appName: 'SaveMe',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
        presentationOptions: ['badge', 'sound', 'alert']
    }
}
};

export default config;
