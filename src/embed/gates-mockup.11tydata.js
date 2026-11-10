// The Gates mockup copies a third-party page, so it’s built locally only, never in production
module.exports = {
  permalink: process.env.ELEVENTY_PRODUCTION === 'true' ? false : 'embed/gates-mockup/'
};
