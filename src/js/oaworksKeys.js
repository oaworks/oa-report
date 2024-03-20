var _OAcookie, ck, o, persistentKey;

// Function to manage OAKeys (orgkey) cookies
_OAcookie = function(obj, persistent) {
  var c, d, domain, expires, i, len, ref, t;
  if (obj != null) {
    domain = '.' + window.location.host;
    if (domain.startsWith('.bg.')) {
      domain = domain.replace('.bg.', '.');
    }
    t = 'OAKeys=';
    if (obj) {
      t += encodeURIComponent(JSON.stringify(obj));
      // Set expiration based on persistent param or default to 365 days for any orgkey
      expires = persistent ? 365 : 365; // Keep the default expiry to 365, regardless of persistent param
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

// Check for 'persistent=true' in the URL
persistentKey = window.location.search.includes('persistent=true');

// Retrieve current OAKeys cookie
ck = _OAcookie();

// Initialise window.OAKEYS
window.OAKEYS = typeof ck === 'object' ? ck : {};

if (window.location.search.includes('orgkey=')) {
  try {
    o = window.location.search.split('orgkey=')[1].split('&')[0];
    o = decodeURIComponent(o);
  } catch (error) {}
  
  if (o) {
    window.OAKEYS[o] = true; // Mark the key as present
    _OAcookie(window.OAKEYS, persistentKey); // Pass persistentKey flag to _OAcookie function
    // Conditionally remove orgkey from URL based on the persistent param
    if (!persistentKey) {
      try { 
        let newUrl = window.location.href.split('?')[0];
        history.pushState(null, null, newUrl);
      } catch (e) {};
    }
  }
}

if (window.location.search.includes('logout')) {
  window.OAKEYS = {};
  _OAcookie(false); // Clear the cookie
  try { history.pushState(null, null, window.location.href.split('?')[0]); } catch (e) {};
}