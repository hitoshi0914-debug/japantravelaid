import { siteConfig } from '../site.config';

// site.config の adsensePublisherId を 'pub-…' に揃える（'ca-pub-…' と書かれていても可）。空なら ''。
export const adsensePubId = siteConfig.adsensePublisherId.trim().replace(/^ca-/, '');
export const adsenseClient = adsensePubId ? `ca-${adsensePubId}` : '';
