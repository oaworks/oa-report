// =================================================
// oaWorksKeys.js
// Set and remove the orgkey cookie
// =================================================

var _OAcookie, ck, o;

_OAcookie = function(obj) {
  var c, d, expires, i, len, ref, t;
  const hostname = window.location.hostname;
  const domain = '.' + hostname;
  if (obj != null) {
    t = 'OAKeys=';
    if (obj) {
      t += encodeURIComponent(JSON.stringify(obj));
      expires = 365;
    } else {
      expires = -1;
    }
    d = new Date();
    d.setDate(d.getDate() + expires);
    const expiry = new Date(d).toUTCString();

    // Write both host-only and domain cookies
    document.cookie = `OAKeys=${encodeURIComponent(JSON.stringify(obj))}; expires=${expiry}; path=/; secure`;
    document.cookie = `OAKeys=${encodeURIComponent(JSON.stringify(obj))}; expires=${expiry}; domain=${domain}; path=/; secure`;

    return t;
  } else {
    ref = document.cookie.split(';');
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i].trim();
      if (c.startsWith('OAKeys=')) {
        try {
          return JSON.parse(decodeURIComponent(c.substring(7)));
        } catch (e) { return false; }
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
  window.OAKEYS = {};
  sessionStorage.removeItem('orgkey');

  const hostname = window.location.hostname;
  const domain = '.' + hostname;
  const expired = 'Thu, 01 Jan 1970 00:00:00 GMT';

  // Delete both variants explicitly
  document.cookie = `OAKeys=; expires=${expired}; path=/; secure`;
  document.cookie = `OAKeys=; expires=${expired}; domain=${domain}; path=/; secure`;

  // Remove ?logout from URL
  try {
    const params = new URLSearchParams(window.location.search);
    params.delete('logout');
    const newUrl = params.toString() ? `?${params}` : window.location.pathname;
    history.replaceState(null, '', newUrl);
  } catch (_) {}
}