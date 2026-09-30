declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

export const GA_TRACKING_ID = 'G-9TG7JEDDCX';

// 計測する本番ホスト。localhost・127.0.0.1:8545・workers.dev のプレビューなどは計測しない
export const PRODUCTION_HOSTS = ['nknighta.me', 'www.nknighta.me'];

// /?notrack=1 を一度開いたブラウザは以後計測しない(自分のアクセス除外用。/?notrack=0 で解除)
export const NOTRACK_KEY = 'notrack';

// gtag('config') より前に実行するインラインスクリプト。
// ga-disable-<ID> は config より先に立てないと効かないので、判定はここで完結させる。
export const gtagInitScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
(function () {
  var hosts = ${JSON.stringify(PRODUCTION_HOSTS)};
  var off = hosts.indexOf(window.location.hostname) === -1;
  try {
    var q = new URLSearchParams(window.location.search).get('notrack');
    if (q === '1') localStorage.setItem('${NOTRACK_KEY}', '1');
    if (q === '0') localStorage.removeItem('${NOTRACK_KEY}');
    if (localStorage.getItem('${NOTRACK_KEY}') === '1') off = true;
  } catch (e) {}
  if (off) { window['ga-disable-${GA_TRACKING_ID}'] = true; return; }
  gtag('js', new Date());
  // Client-side navigations are tracked by GA4 enhanced measurement
  // (history events). Do not set page_path here: it persists on the
  // config and mislabels every later SPA page_view as the landing path.
  gtag('config', '${GA_TRACKING_ID}');
})();
`;

export const isAnalyticsEnabled = (): boolean => {
  if (process.env.NODE_ENV !== 'production') return false;
  if (typeof window === 'undefined') return false;
  if ((window as any)[`ga-disable-${GA_TRACKING_ID}`]) return false;
  return PRODUCTION_HOSTS.includes(window.location.hostname);
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: { action: string; category?: string; label?: string; value?: number }) => {
  if (!isAnalyticsEnabled() || typeof window.gtag !== 'function') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// 外部リンクのクリック。GA4 管理画面で outbound_click をキーイベントに設定すると、
// どのリンクが押されているかがわかる
export const outboundClick = (href: string, location: string) => {
  if (!isAnalyticsEnabled() || typeof window.gtag !== 'function') return;
  let linkId = href;
  try {
    const u = new URL(href);
    linkId = (u.hostname.replace(/^www\./, '') + u.pathname).replace(/\/$/, '');
  } catch {}
  window.gtag('event', 'outbound_click', {
    link_id: linkId,
    link_url: href,
    location,
    transport_type: 'beacon',
  });
};
