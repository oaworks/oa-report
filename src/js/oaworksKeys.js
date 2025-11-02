// =================================================
// oaWorksKeys.js
// Set and remove the orgkey cookie
// =================================================

import { deleteCookieEverywhere } from './utils.js';

var _OAcookie, ck, o;

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
  // 1) Drop in-memory state
  window.OAKEYS = {};

  // 2) Expire cookie(s)
  deleteCookieEverywhere('OAKeys');

  // 3) Clear any session remnant
  try { sessionStorage.removeItem('orgkey'); } catch (_) {}

  // 4) Tidy URL (remove only ?logout)
  try {
    const params = new URLSearchParams(window.location.search);
    params.delete('logout');
    const newQuery = params.toString();
    const newUrl = newQuery ? `?${newQuery}` : window.location.pathname;
    history.replaceState(null, '', newUrl);
  } catch (_) {}
}
