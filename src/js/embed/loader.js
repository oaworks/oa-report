// Embed loader — early version for checking the web-component approach (GH#4005).
//
// Defines <oa-report-embed>: it attaches a shadow root, loads the embed's own
// stylesheet and font inside it, then moves its <template> child's content in.
// Real embeds will fetch that content by ID instead; here it's rendered
// server-side so this check doesn't depend on that yet.
class OAReportEmbed extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return; // already upgraded
    const root = this.attachShadow({ mode: 'open' });

    ['cssUrl', 'fontCssUrl'].forEach((key) => {
      const href = this.dataset[key];
      if (!href) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      root.appendChild(link);
    });

    const template = this.querySelector('template');
    if (template) root.appendChild(template.content.cloneNode(true));
  }
}

if (!customElements.get('oa-report-embed')) {
  customElements.define('oa-report-embed', OAReportEmbed);
}
