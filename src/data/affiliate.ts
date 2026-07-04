// Single source of truth for the outbound Dentabiome purchase link. Every CTA in the
// site (header, bridge cards, product pages, homepage) imports this instead of
// hardcoding the URL, so the tracking hop can be swapped in one place.
export const AFFILIATE_URL =
  'https://getdentabiome.com/discovery?hopId=5e151041-fe3e-4aca-99fa-c50580113ca6&hop=edwinner92';

// Spread this on any outbound <a> to the affiliate link: opens in a new tab and
// marks the link as sponsored per Google's link-attribute guidelines.
export const AFFILIATE_LINK_ATTRS = {
  target: '_blank',
  rel: 'sponsored noopener',
} as const;
