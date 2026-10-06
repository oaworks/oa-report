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
    // Matches the class attribute wherever it falls in the tag (it's always after
    // href in our markup) and among however many other classes sit alongside it.
    .replace(/<a\b[^>]*>/g, tag => {
      const classes = tag.match(/class=(['"])([^'"]*)\1/)?.[2].split(/\s+/) ?? [];
      return classes.includes('org-policy-url')
        ? tag.replace(/href=(['"])[^'"]*\1/, `href='${orgMeta.orgPolicyUrl ?? '#'}'`)
        : tag;
    })
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
 * Builds tooltip HTML for a field definition.
 *
 * With the "label" heading style (Insights), the generic lead sentence
 * always shows — matching every other Insight card's "The percentage of
 * {subject}..." sentence — with the organisation's own configured help text
 * (e.g. Coverage/Compliance bullets), when available, shown underneath as
 * the specific criteria.
 *
 * With the "sentence" heading style (Explore), the organisation's help text
 * instead replaces the generic lead entirely, folded into one sentence with
 * its own framing phrase — Explore only ever shows one such group, so a
 * second, separate generic sentence above it would just be redundant.
 *
 * Either way, the generic, cross-organisation details note (e.g. which data
 * sources we use) is always kept separate, collapsed behind "Methodology".
 *
 * @param {Object} options - Field definition tooltip options.
 * @param {string} [options.info=''] - Generic, organisation-agnostic lead sentence.
 * @param {string} [options.details=''] - Generic, cross-organisation methodology note.
 * @param {string[]} [options.help_text=[]] - Help-text keys to resolve for this field.
 * @param {Object.<string, string>} [options.help_text_by_key={}] - Organisation-specific help text keyed by field id.
 * @param {string} [options.help_text_style='paragraph'] - "paragraph" or "bullets".
 * @param {'label'|'sentence'} [options.heading_style='label'] - See {@link buildDefinitionHelpHtml}.
 * @param {Object} [options.orgMeta={}] - Organisation-specific values for placeholder injection.
 * @returns {string} Tooltip HTML.
 */
export function buildFieldDefinitionTooltipContent({
  info = '',
  details = '',
  help_text = [],
  help_text_by_key = {},
  help_text_style = 'paragraph',
  heading_style = 'label',
  orgMeta = {}
} = {}) {
  const helpHtml = buildDefinitionHelpHtml({
    help_text,
    help_text_by_key,
    org_meta: orgMeta,
    help_text_style,
    heading_style
  });

  const infoHtml = injectOrgFields(info, orgMeta);
  const leadHtml = heading_style === 'label'
    ? [infoHtml, helpHtml].filter(Boolean).join('')
    : (helpHtml || infoHtml);

  return buildTooltipContent({
    leadHtml,
    detailsHtml: injectOrgFields(details, orgMeta)
  });
}

// Small muted eyebrow labels shown above bullets grouped by help-text key —
// used in Insights, where "Compliant" can combine both coverage and
// compliance criteria in one tooltip and needs the labels to tell them apart.
const HELP_TEXT_SECTION_HEADINGS = {
  covered_by_policy: 'Coverage',
  compliant: 'Compliance'
};

// Short framing phrases used instead, in Explore, where each tooltip only
// ever shows one of these groups — a label would just repeat the tooltip's
// own subject, so a phrase introducing the criteria reads better. Written
// without trailing punctuation: a single point folds straight into one
// sentence with this phrase (see renderPointsWithLeadIn); multiple points
// get it as its own line, with a colon added, above a bulleted list.
const HELP_TEXT_SECTION_INTROS = {
  covered_by_policy: 'Publications are covered if',
  compliant: 'Publications are compliant if'
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
 * Splits plain text (one point per line, so org contacts can list points in
 * a Sheet cell without writing HTML) into trimmed, non-empty points.
 *
 * @param {string} [text=''] - Plain text, one point per line.
 * @returns {string[]} The individual points.
 */
function splitPoints(text = '') {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Renders points as a bulleted list — or, when there's only one, as a single
 * line, since a one-item bullet list reads oddly.
 *
 * @param {string[]} points - Points to render.
 * @returns {string} Rendered HTML.
 */
function renderPointsAsListOrLine(points) {
  if (points.length === 1) return `<p>${escapeHtml(points[0])}</p>`;
  return `<ul class="list-disc list-outside pl-5">${points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>`;
}

/**
 * Renders plain text (one point per line) introduced by a framing phrase
 * (e.g. "Publications are covered if"). A single point folds into one
 * flowing sentence with the phrase — its first letter styled lowercase (via
 * the `lowercase` class, matching the pluralising-suffix pattern used
 * elsewhere in this codebase) since the org's own text still starts with a
 * capital, as it does where it's shown standalone (e.g. Insights). Multiple
 * points keep the phrase as its own line, followed by a list, since several
 * points can't be folded into one sentence.
 *
 * This only reads well when the org's point is itself phrased as something
 * that can follow "if" (e.g. "supported by the Gates Foundation…", not a
 * bare noun phrase missing a verb like "Any version freely available…",
 * which "if" can't turn into a grammatical clause no matter the casing) —
 * that's a content-authoring concern for whoever writes the org's text, not
 * something this function can detect or fix.
 *
 * @param {string} [text=''] - Plain text, one point per line.
 * @param {string} [leadIn=''] - Framing phrase, without trailing punctuation.
 * @returns {string} Rendered HTML.
 */
function renderPointsWithLeadIn(text = '', leadIn = '') {
  const points = splitPoints(text);

  if (points.length === 1 && leadIn) {
    const [first, ...rest] = points[0];
    return `<p>${escapeHtml(leadIn)} <span class="lowercase">${escapeHtml(first)}</span>${escapeHtml(rest.join(''))}</p>`;
  }

  const introHtml = leadIn ? `<p class="mb-1">${escapeHtml(leadIn)}:</p>` : '';
  return `${introHtml}${renderPointsAsListOrLine(points)}`;
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
 * @param {'label'|'sentence'} [options.heading_style='label'] - How to introduce each group for "bullets" style:
 * a small eyebrow label (Insights, where groups can combine) or a framing sentence (Explore, always one group).
 * @returns {string} Rendered help HTML.
 */
export function buildDefinitionHelpHtml({
  help_text = [],
  help_text_by_key = {},
  org_meta = {},
  help_text_style = 'paragraph',
  heading_style = 'label'
} = {}) {
  const helpEntries = help_text
    .map((key) => ({ key, html: help_text_by_key[key]?.trim() }))
    .filter((entry) => entry.html)
    .map((entry) => ({ ...entry, html: injectOrgFields(entry.html, org_meta) }));

  if (!helpEntries.length) return '';
  if (help_text_style === 'bullets') {
    const groups = helpEntries.map(({ key, html }) => {
      if (heading_style === 'sentence') {
        return `<div>${renderPointsWithLeadIn(html, HELP_TEXT_SECTION_INTROS[key])}</div>`;
      }
      const heading = HELP_TEXT_SECTION_HEADINGS[key];
      const headingHtml = heading ? `<div class="text-xs font-medium uppercase tracking-wide text-neutral-700 mt-2 mb-1">${heading}:</div>` : '';
      return `<div>${headingHtml}${renderPointsAsListOrLine(splitPoints(html))}</div>`;
    });
    return `<div class="space-y-2">${groups.join('')}</div>`;
  }

  return helpEntries.map(({ html }) => html).join(' ');
}
