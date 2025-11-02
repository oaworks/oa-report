// =================================================
// oaWorksKeys.js
// Set and remove the orgkey cookie
// =================================================

var _OAcookie, ck, o;

/**
 * Deletes a cookie across common scope variants to ensure removal.
 *
 * @param {string} name - Cookie name, e.g. "OAKeys".
 */
function _OAdeleteAllScopes(name) {
  try {
    const host = window.location.host;           // e.g. dev.oa.report
    const dotted = '.' + host;                   // e.g. .dev.oa.report
    const past = 'Thu, 01 Jan 1970 00:00:00 GMT';
    // Host-only (no Domain=)
    document.cookie = `${name}=; expires=${past}; path=/; secure`;
    // Subdomain-scoped (.host)
    document.cookie = `${name}=; expires=${past}; domain=${dotted}; path=/; secure`;
  } catch (e) {}
}

_OAcookie = function(obj) {
  var c, d, domain, expires, i, len, ref, t;
  if (obj != null) {
    domain = '.' + window.location.host;
    if (domain.startsWith('.bg.')) {
      domain = domain.replace('.bg.', '.');
    }
    t = 'OAKeys=';
    if (obj) {
      t += encodeURIComponent(JSON.stringify(obj)); // so if values is false or '' this will effectively remove the cookie
      expires = 365;
    } else {
      expires = -1;
    }
    d = new Date();
    d.setDate(d.getDate() + expires);
    t += '; expires=' + new Date(d).toUTCString();
    t += '; domain=' + domain + '; path=/; secure'; // Reliably clear cookie across subdomains
    document.cookie = t;
    return t;
  } else {
    ref = document.cookie.split(';');
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf('OAKeys=') !== -1) {
        return JSON.parse(decodeURIComponent(c.substring(7, c.length)));
      }
    }
    return false;
  }
};

ck = _OAcookie();

window.OAKEYS = typeof ck === 'object' ? ck : {};

if (window.location.search.includes('orgkey=')) {
  try {
    o = window.location.search.split('org=')[1].split('&')[0];
  } catch (error) {}
  try {
    if (o == null) {
      o = window.location.href.split('//')[1].split('/')[1];
    }
  } catch (error) {}
  if (o) {
    window.OAKEYS[decodeURIComponent(o)] = window.location.search.split('orgkey=')[1].split('&')[0];
    _OAcookie(window.OAKEYS);
    
    // Remove orgkey from the URL immediately after consuming it (avoid accidental sharing)
    try {
      const params = new URLSearchParams(window.location.search);
      params.delete('orgkey');
      const newQuery = params.toString();
      const newUrl = newQuery ? `?${newQuery}` : window.location.pathname;
      history.replaceState(null, '', newUrl);
    } catch (e) {}
  }
}

if (window.location.search.includes('logout')) {
  window.OAKEYS = {}; // or work out the org here and only logout of that org?
  _OAcookie(false);
  _OAdeleteAllScopes('OAKeys');
  try {
    // Also clear any session-scoped key remnants to prevent silent re-login on refresh
    sessionStorage.removeItem('orgkey');
    // Remove only ?logout so other filters (start/end/breakdown, etc.) remain
    const params = new URLSearchParams(window.location.search);
    params.delete('logout');
    const newQuery = params.toString();
    const newUrl = newQuery ? `?${newQuery}` : window.location.pathname;
    history.replaceState(null, '', newUrl);
  } catch (e) {};
}
