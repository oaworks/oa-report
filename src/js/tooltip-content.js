// =================================================
// tooltip-content.js
// Shared tooltip content helpers
// =================================================

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
 * @param {string} [options.leadHtml=''] - Primary HTML shown at the top of the tooltip.
 * @param {string} [options.helpHtml=''] - Optional supplementary HTML shown below the lead content.
 * @param {string} [options.detailsHtml=''] - Optional HTML shown inside a collapsible section.
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
    ${hasLead ? `<div class='${hasDetails ? "mb-2" : ""}'>${leadHtml}</div>` : ""}
    ${hasHelp ? `<div class='${hasDetails ? "mb-2" : ""}'>${resolvedHelpHtml}</div>` : ""}
    ${hasDetails ? `<details><summary class='hover:cursor-pointer'>${detailsLabel}</summary><div class='mt-2'>${detailsHtml}</div></details>` : ""}
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
 * @param {string|null} [additionalHelpText=null] - Optional org-specific help text.
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
