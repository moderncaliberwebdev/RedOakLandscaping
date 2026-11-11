const BASE = 'https://www.redoakinc.org'

export default function sitemap() {
  return ['', '/gallery', '/services', '/estimate', '/truegrid'].map((path) => ({
    url: `${BASE}${path}`,
    priority: path ? 0.8 : 1,
  }))
}
