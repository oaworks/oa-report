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
    t += '; domain=' + domain + '; secure';
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
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const orgKeyValue = params.get('orgkey');

  // Add orgkey value to window.OAKEYS and update cookie
  if (orgKeyValue) {
      window.OAKEYS[decodeURIComponent(orgKeyValue)] = orgKeyValue;
      _OAcookie(window.OAKEYS);

      // Remove only the orgkey parameter from the URL
      params.delete('orgkey');

      // Update the URL without reloading the page, preserving other parameters
      try {
          const newUrl = `${url.pathname}${params.toString() ? '?' + params.toString() : ''}`;
          history.pushState(null, null, newUrl);
      } catch (e) {
          console.error("Error updating URL:", e);
      }
  }
}

if (window.location.search.includes('logout')) {
  window.OAKEYS = {}; // or work out the org here and only logout of that org?
  _OAcookie(false);
  try { history.pushState(null, null, window.location.href.split('?')[0]); } catch (e) {};
}