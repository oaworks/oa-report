// Embed loader (GH#4005). The real snippet is one placeholder div plus this
// script:
//   <div data-oareport-org="ORG" data-oareport-type="TYPE"
//        data-oareport-metric="METRIC" data-link="report"></div>
//   <script src=".../embed.js"></script>
// A plain div, not a custom tag, because an unrecognised tag is more likely to
// be stripped by a CMS than a div. Settings (like data-link) live on the
// snippet and are applied client-side, so they never need a new build.
// On load, this script turns each div into an <oa-report-embed>, which
// fetches that org/type/metric’s fragment and renders it. A failed fetch
// renders nothing — site visitors see no card, never a broken one — and logs
// why to the console, for whoever pasted the snippet to diagnose.

// Captured once, synchronously, while this is the running script — not safe to
// read later. Every other URL here is resolved against it, so the embed works
// from whichever host it’s served from.
const SCRIPT_BASE = new URL('.', (document.currentScript && document.currentScript.src) || location.href);

// Applies snippet settings to a rendered fragment. Each setting only touches
// elements that opt in, so adding one here never affects embeds that don’t use it.
function applySettings(root, dataset) {
  if (dataset.link === 'report') {
    const a = root.querySelector('[data-report-url]');
    if (a) a.href = a.dataset.reportUrl;
  }
}

class OAReportEmbed extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return; // already upgraded
    const root = this.attachShadow({ mode: 'open' });

    ['cssUrl', 'fontCssUrl'].forEach((key, i) => {
      const href = this.dataset[key] || new URL(i === 0 ? 'embed.css' : 'embed-font.css', SCRIPT_BASE).href;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      root.appendChild(link);
    });

    // Check pages (see gates-web-component-tile.njk) render the card inline,
    // so there’s nothing to fetch for them.
    const template = this.querySelector('template');
    if (template) {
      root.appendChild(template.content.cloneNode(true));
      applySettings(root, this.dataset);
      return;
    }

    const { oareportOrg: org, oareportType: type, oareportMetric: metric } = this.dataset;
    if (!org || !type || !metric) return;
    const label = org + '/' + type + '/' + metric;
    fetch(new URL('embed/f/' + [org, type, metric].map(encodeURIComponent).join('/') + '/', SCRIPT_BASE).href)
      .then((response) => {
        // A real response, just not a found one — the combination is wrong, not us.
        if (!response.ok) {
          const notFound = new Error('no embed found for this combination (HTTP ' + response.status + ')');
          notFound.ownIssue = false;
          throw notFound;
        }
        return response.text();
      })
      .then((html) => {
        // Not an Element, so it has no insertAdjacentHTML — parse into a
        // <template> instead and move its content across.
        const parsed = document.createElement('template');
        parsed.innerHTML = html;
        root.appendChild(parsed.content);
        applySettings(root, this.dataset);
      })
      .catch((err) => {
        // Nothing shown to site visitors; this is only for whoever pasted the
        // snippet, in their own browser console. No response at all (err.ownIssue
        // unset) means our hosting is unreachable, not a bad combination — say so,
        // since there’s nothing to fix in the snippet.
        console.error(
          err.ownIssue === false
            ? 'OA.Report embed "' + label + '" was not found. Check the attributes in the snippet against what OA.Report gave you.'
            : 'OA.Report embed "' + label + '" could not be reached (' + err.message + '). This isn’t a problem with the snippet — try again shortly, or contact OA.Report if it continues.'
        );
      });
  }
}

if (!customElements.get('oa-report-embed')) {
  customElements.define('oa-report-embed', OAReportEmbed);
}

// Upgrade every placeholder div on the page into an <oa-report-embed>,
// carrying over its org/type/metric and settings as-is.
document.querySelectorAll('[data-oareport-org][data-oareport-type][data-oareport-metric]').forEach((div) => {
  const embed = document.createElement('oa-report-embed');
  Object.assign(embed.dataset, div.dataset);
  div.replaceWith(embed);
});
