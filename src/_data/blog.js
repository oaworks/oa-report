/**
 * _data/blog.js
 * Fetch the three latest “oa.report”-latest posts from the OA.Works Ghost blog.
 * Requires `npm i @tryghost/content-api`
 */
const ContentAPI = require('@tryghost/content-api');

const api = new ContentAPI({
  url:   'https://oabutton.ghost.io',        // Full Ghost URL
  key:   'cdfb45e729a2cc651f79ab3b9d',       // Content API key
  version: 'v2.0'                            // Ghost version
});

module.exports = async function () {
  try {
    return await api.posts.browse({
      filter:  'tag:oa-report',
      limit:   3,
      include: 'authors,tags',
      order:   'published_at DESC'
    });
  } catch (err) {
    console.error('Ghost API error (blog):', err);
    return [];        // Keeps Eleventy happy if the call fails
  }
};
