// =================================================
// tooltip-content.js
// Shared tooltip content helpers
// =================================================

/**
 * Builds tooltip HTML with optional lead content, supplementary help text
 * and a collapsible details section.
 *
 * @param {Object} options - Tooltip content options.
 * @param {string} [options.leadHtml=''] - Primary HTML shown at the top of the tooltip.
 * @param {string} [options.helpHtml=''] - Optional supplementary HTML shown below the lead content.
 * @param {string} [options.detailsHtml=''] - Optional HTML shown inside a collapsible section.
 * @param {string} [options.detailsLabel='Methodology'] - Label shown on the collapsible section.
 * @returns {string} Tooltip HTML.
 */
export function buildTooltipContent({
  leadHtml = '',
  helpHtml = '',
  detailsHtml = '',
  detailsLabel = 'Methodology'
} = {}) {
  const hasDetails = !!detailsHtml;

  return `
    <p class='${hasDetails ? "mb-2" : ""}'>${leadHtml}</p>
    ${helpHtml ? `<p class='mb-2'>${helpHtml}</p>` : ""}
    ${hasDetails ? `<details><summary class='hover:cursor-pointer'>${detailsLabel}</summary><p class='mt-2'>${detailsHtml}</p></details>` : ""}
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
