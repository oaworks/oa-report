// Mockups copy third-party pages, so they’re built on localhost and dev only, never on the live site
const url = (process.env.ELEVENTY_BASE_URL || '').toLowerCase();
const isDev = ['dev.oa.report', 'localhost', '127.0.0.1'].some((host) => url.includes(host));

module.exports = {
  permalink: isDev ? 'embed/gates-mockup/' : false
};
