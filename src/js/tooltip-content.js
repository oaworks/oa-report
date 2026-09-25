// =================================================
// tooltip-content.js
// Shared tooltip content helpers
// =================================================

/**
 * Replaces org-specific placeholder spans/links inside tooltip HTML.
 *
 * @param {string} [html=''] - HTML fragment that may contain org placeholder markup.
 * @param {Object} [orgMeta={}] - Org-specific values used for substitution.
 * @param {string} [orgMeta.orgName] - Organisation display name.
 * @param {string} [orgMeta.orgPolicyCoverage] - Org-specific policy coverage text.
 * @param {string} [orgMeta.orgPolicyCompliance] - Org-specific policy compliance text.
 * @param {string} [orgMeta.orgPolicyUrl] - Policy URL used to replace placeholder links.
 * @returns {string} HTML with org placeholders resolved.
 */
export function injectOrgFields(html = '', orgMeta = {}) {
  return /org-(name|policy-(coverage|compliance|url))/.test(html) ? html
    .replace(/<span class=['"]org-name['"]><\/span>/g, orgMeta.orgName ?? '')
    .replace(/<span class=['"]org-policy-coverage['"]><\/span>/g, orgMeta.orgPolicyCoverage ?? '')
    .replace(/<span class=['"]org-policy-compliance['"]><\/span>/g, orgMeta.orgPolicyCompliance ?? '')
    .replace(/class=['"]org-policy-url['"][^>]*href=['"][^'"]*['"]/g, match => match.replace(/href=['"][^'"]*['"]/, `href='${orgMeta.orgPolicyUrl ?? '#'}'`))
    : html;
}

/**
 * Builds tooltip HTML with optional lead content, supplementary help text
 * and a collapsible details section.
 *
 * @param {Object} options - Tooltip content options.
 * All HTML arguments are treated as trusted HTML from our own constants/API.
 *
 * @param {string} [options.leadHtml=''] - Primary HTML shown at the top of the tooltip.
 * @param {string} [options.helpHtml=''] - Optional supplementary trusted HTML shown below the lead content.
 * @param {string} [options.detailsHtml=''] - Optional trusted HTML shown inside a collapsible section.
 * @param {string} [options.detailsLabel='Methodology'] - Label shown on the collapsible section.
 * @param {boolean} [options.dedupeHelpTextAgainstLead=false] - Whether to
 * suppress supplementary help text when it duplicates the lead content.
 * @returns {string} Tooltip HTML.
 */
export function buildTooltipContent({
  leadHtml = '',
  helpHtml = '',
  detailsHtml = '',
  detailsLabel = 'Methodology',
  dedupeHelpTextAgainstLead = false
} = {}) {
  const shouldHideHelp = dedupeHelpTextAgainstLead
    && helpHtml
    && getTooltipPlainText(leadHtml).includes(getTooltipPlainText(helpHtml));
  const resolvedHelpHtml = shouldHideHelp ? '' : helpHtml;
  const hasDetails = !!detailsHtml;
  const hasLead = !!leadHtml;
  const hasHelp = !!resolvedHelpHtml;

  return `
    ${hasLead ? `<div class='space-y-2 ${hasDetails ? "mb-2" : ""}'>${leadHtml}</div>` : ""}
    ${hasHelp ? `<div class='space-y-2 ${hasDetails ? "mb-2" : ""}'>${resolvedHelpHtml}</div>` : ""}
    ${hasDetails ? `<details><summary class='hover:cursor-pointer'>${detailsLabel}</summary><div class='mt-2 space-y-2'>${detailsHtml}</div></details>` : ""}
  `;
}

/**
 * Converts HTML into plain text so tooltip content can be compared
 * without markup affecting duplicate detection.
 *
 * @param {string} [html=''] - HTML to convert.
 * @returns {string} Normalised plain text.
 */
export function getTooltipPlainText(html = '') {
  const textBuffer = getTooltipPlainText.textBuffer || (getTooltipPlainText.textBuffer = document.createElement('div'));
  textBuffer.innerHTML = html;
  return textBuffer.textContent.replace(/\s+/g, ' ').trim();
}

/**
 * Builds definition-style tooltip content from a labels config entry plus
 * optional organisation-specific help text.
 *
 * @param {Object} labelData - Labels config entry with info/details fields.
 * @param {string|null} [additionalHelpText=null] - Optional org-specific help text as trusted HTML.
 * @param {Object} [orgMeta={}] - Org-specific field values for placeholder injection.
 * @returns {string} Tooltip HTML.
 */
export function buildDefinitionTooltipContent(labelData, additionalHelpText = null, orgMeta = {}) {
  return buildTooltipContent({
    leadHtml: injectOrgFields(labelData?.info, orgMeta),
    helpHtml: additionalHelpText ? injectOrgFields(additionalHelpText, orgMeta) : '',
    detailsHtml: injectOrgFields(labelData?.details, orgMeta),
    dedupeHelpTextAgainstLead: true
  });
}

// Section headings shown above bullets grouped by help-text key.
const HELP_TEXT_SECTION_HEADINGS = {
  covered_by_policy: 'Coverage',
  compliant: 'Compliance'
};

/**
 * Escapes HTML-significant characters so plain text can be safely inserted as markup.
 *
 * @param {string} [text=''] - Plain text to escape.
 * @returns {string} Escaped text.
 */
function escapeHtml(text = '') {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Converts plain text (one requirement per line) into escaped `<li>` items,
 * so org contacts can list bullets in a Sheet cell without writing HTML.
 *
 * @param {string} [text=''] - Plain text, one bullet per line.
 * @returns {string} Concatenated `<li>` items.
 */
function buildBulletItemsFromPlainText(text = '') {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join('');
}

/**
 * Builds supplementary help HTML from one or more org help-text keys.
 *
 * @param {Object} options - Help content options.
 * @param {string[]} [options.help_text=[]] - Ordered help-text keys to resolve.
 * @param {Object.<string, string>} [options.help_text_by_key={}] - Org-specific help text keyed by field id.
 * For "bullets" style, plain text with one requirement per line — each line is escaped and rendered as its own `<li>`.
 * For "paragraph" style, trusted HTML.
 * @param {Object} [options.org_meta={}] - Org-specific values for placeholder injection.
 * @param {string} [options.help_text_style='paragraph'] - Output style, e.g. "paragraph" or "bullets".
 * @returns {string} Rendered help HTML.
 */
export function buildDefinitionHelpHtml({
  help_text = [],
  help_text_by_key = {},
  org_meta = {},
  help_text_style = 'paragraph'
} = {}) {
  const helpEntries = help_text
    .map((key) => ({ key, html: help_text_by_key[key]?.trim() }))
    .filter((entry) => entry.html)
    .map((entry) => ({ ...entry, html: injectOrgFields(entry.html, org_meta) }));

  if (!helpEntries.length) return '';
  if (help_text_style === 'bullets') {
    const groups = helpEntries.map(({ key, html }) => {
      const heading = HELP_TEXT_SECTION_HEADINGS[key];
      const headingHtml = heading ? `<div class="font-semibold uppercase mt-2 mb-1">${heading}:</div>` : '';
      return `<div>${headingHtml}<ul class="list-disc list-outside pl-5">${buildBulletItemsFromPlainText(html)}</ul></div>`;
    });
    return `<div class="space-y-2">${groups.join('')}</div>`;
  }

  return helpEntries.map(({ html }) => html).join(' ');
}
