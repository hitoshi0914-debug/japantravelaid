import type { CapacitorConfig } from '@capacitor/cli';

// スマホアプリ（Capacitor）。サイトを PUBLIC_APP=1 でビルドした dist-app/ をアプリに同梱する（電波がなくても開ける）。
// appId はストアに出したあとは変えられない。
const config: CapacitorConfig = {
  appId: 'com.yamaguchi.japantravelaid',
  appName: 'Japan Travel Aid',
  webDir: 'dist-app',
};

export default config;
