// =================================================
// auth.js
// Centralised orgkey handling and login state
// =================================================

import { getURLParam, removeURLParams, displayNone, removeDisplayStyle } from "./utils.js";

const AUTH_STORAGE_KEY = "orgkey";

let orgSlug = null;
let orgKey = null;
let loggedIn = false;

const listeners = new Set();

function safeSessionGet() {
  // Safe access to sessionStorage so we don't break on browsers that block it
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY);
  } catch (_) {
    return null;
  }
}

function safeSessionSet(value) {
  // Safe set for sessionStorage; silently ignore if storage is unavailable
  try {
    sessionStorage.setItem(AUTH_STORAGE_KEY, value);
  } catch (_) {}
}

function safeSessionClear() {
  // Safe clear for sessionStorage; ignore errors if storage is blocked
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (_) {}
}

function currentState() {
  return {
    loggedIn,
    orgKey,
    orgKeyParam: orgKey ? `&orgkey=${orgKey}` : ""
  };
}

function notify() {
  const snapshot = currentState();
  listeners.forEach((cb) => cb(snapshot));
}

function extractOrgKeyFromOAKeys() {
  if (typeof window === "undefined") return null;
  if (typeof window.OAKEYS !== "object") return null;
  if (!window.OAKEYS) return null;

  if (orgSlug && window.OAKEYS[orgSlug]) {
    return window.OAKEYS[orgSlug];
  }

  const values = Object.values(window.OAKEYS || {});
  return values.length ? values[0] : null;
}

/**
 * Sets up the login state. Looks for orgkey/logout in the URL first,
 * then session storage, then any older OAKEYS cookie.
 * @param {string} [slug] - Optional org slug to pick the matching orgkey.
 * @returns {{loggedIn: boolean, orgKey: string|null, orgKeyParam: string}}
 */
export function initAuth(slug) {
  if (slug && !orgSlug) {
    orgSlug = decodeURIComponent(slug);
  }

  // Handle ?logout straight away
  const logout = getURLParam("logout");
  if (logout !== null) {
    clearAuth();
    removeURLParams("logout");
  }

  // orgkey priority: URL param, then sessionStorage, then OAKEYS cookie
  const urlOrgKey = getURLParam("orgkey");
  if (urlOrgKey) {
    orgKey = urlOrgKey;
    safeSessionSet(urlOrgKey);
    removeURLParams("orgkey");
  } else if (!orgKey) {
    const stored = safeSessionGet();
    if (stored) {
      orgKey = stored;
    } else {
      const fromCookie = extractOrgKeyFromOAKeys();
      if (fromCookie) {
        orgKey = fromCookie;
        safeSessionSet(fromCookie);
      }
    }
  }

  loggedIn = Boolean(orgKey);
  notify();
  return currentState();
}

/**
 * Subscribe to auth state updates. Returns an unsubscribe function.
 * The callback is called immediately with the current state.
 */
export function onAuthChange(callback) {
  listeners.add(callback);
  callback(currentState());
  return () => listeners.delete(callback);
}

/** Returns the current auth snapshot without subscribing. */
export function getAuthState() {
  return currentState();
}

/** Returns true if we currently have an orgkey (presence-only for now). */
export function isLoggedIn() {
  return loggedIn;
}

/** Returns the raw orgkey string, if any. */
export function getOrgKey() {
  return orgKey;
}

/** Returns the query param fragment (&orgkey=...) or empty string. */
export function getOrgKeyParam() {
  return orgKey ? `&orgkey=${orgKey}` : "";
}

/** Clears the stored orgkey and login state. */
export function clearAuth() {
  orgKey = null;
  loggedIn = false;
  safeSessionClear();
  notify();
}

/**
 * Quick helper to show or hide elements based on login state.
 * @param {Object} config
 * @param {Array<string>} [config.showWhenLoggedIn] - Element IDs to show when logged in.
 * @param {Array<string>} [config.showWhenLoggedOut] - Element IDs to show when logged out.
 * @param {Array<string>} [config.hideWhenLoggedIn] - Element IDs to hide when logged in.
 * @param {Array<string>} [config.hideWhenLoggedOut] - Element IDs to hide when logged out.
 */
export function applyAuthVisibility({
  showWhenLoggedIn = [],
  showWhenLoggedOut = [],
  hideWhenLoggedIn = [],
  hideWhenLoggedOut = []
} = {}) {
  if (loggedIn) {
    showWhenLoggedIn.forEach(removeDisplayStyle);
    hideWhenLoggedIn.forEach(displayNone);
    showWhenLoggedOut.forEach(displayNone);
    hideWhenLoggedOut.forEach(removeDisplayStyle);
  } else {
    showWhenLoggedOut.forEach(removeDisplayStyle);
    hideWhenLoggedOut.forEach(displayNone);
    showWhenLoggedIn.forEach(displayNone);
    hideWhenLoggedIn.forEach(removeDisplayStyle);
  }
}
