// ================================================
// constants/actions.js
// Human-readable labels and order for Actions tabs
// ================================================

export const ACTION_LABELS = {
  email_author_deposit: "Self-archive articles",
  email_author_vor: "Deposit publisher PDFs",
  email_author_aam: "Deposit accepted manuscripts",
  email_author_unpublished_openrxiv_preprint_not_ccby: "Update non-CC BY preprints",
  apc_followup: "Correct publisher errors",
  unanswered_requests: "Escalate unanswered requests",
  point_of_award_check: "Perform point-of-award check"
};

export const ACTION_ORDER = [
  "point_of_award_check",
  "email_author_deposit",
  "email_author_vor",
  "email_author_aam",
  "email_author_unpublished_openrxiv_preprint_not_ccby",
  "apc_followup",
  "unanswered_requests"
];

const ACTION_ARTICLE_LINK_CLASSES = "inline-flex items-center rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-100 whitespace-nowrap outline outline-1 outline-transparent transition-colors hover:bg-neutral-700";
const ACTION_TABLE_CELL_CLASSES = "border-b border-neutral-700 bg-neutral-800 px-3 py-2 text-sm align-top break-words";
const ACTION_TABLE_OPTIONAL_CELL_CLASSES = "hidden border-b border-neutral-700 bg-neutral-800 px-3 py-2 text-sm align-top break-words sm:table-cell";
const ACTION_TABLE_CENTER_CELL_CLASSES = "border-b border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-center align-top break-words";
const ACTION_TABLE_OPTIONAL_CENTER_CELL_CLASSES = "hidden border-b border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-center align-top break-words sm:table-cell";
const ACTION_TABLE_PRIMARY_TEXT_CLASSES = "text-neutral-100";
const ACTION_TABLE_SECONDARY_TEXT_CLASSES = "text-neutral-300";
const ACTION_TABLE_DRAFT_BUTTON_CLASSES = "inline-flex items-center rounded-full border border-transparent bg-carnation-500 p-2 text-white shadow-sm transition duration-200 hover:border-carnation-500 hover:bg-neutral-100 hover:text-carnation-500";

export const DEFAULT_ACTION_EMPTY_STATE_MESSAGE = "We couldn’t find any articles! <br>Try selecting another date range or come back later once new articles are ready.";

// Shown for any action with requiresSingleAuthor: true, when the report isn’t scoped to exactly one author.
export const DEFAULT_NO_AUTHOR_FILTERED_MESSAGE = "Use “+ Add filter” above to search for an author by name or ORCID and see their non-compliant articles. <br>ORCID is recommended, since names alone can sometimes match more than one person.";
export const DEFAULT_MULTIPLE_AUTHORS_FILTERED_MESSAGE = "This action only works for one author at a time. <br>Remove any extra authors from the filter above (the “✕” next to their name) so only one remains.";

// Config for rendering Actions tables
export const ACTION_TABLE_CONFIGS = [
  {
    id: "apc_followup",
    keys: [
      "published_date",
      "title",
      "journal",
      "DOI",
      "publisher",
      "supplements.publisher_license_best",
      "journal_oa_type",
      "oa_status",
      "supplements.apc_cost",
      "supplements.invoice_number",
      "supplements.invoice_date"
    ],
    rowTemplate: `<td class='${ACTION_TABLE_CELL_CLASSES}'>\
        <div class='mb-1 font-medium ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.publisher}</div>\
        <div class='mb-3 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.journal}</div>\
        <div class='${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>OA type: <span class='font-medium'>\${action.journal_oa_type}</span></div>\
      </td>\
      <td class='${ACTION_TABLE_CELL_CLASSES}'>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.published_date}</div>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.DOI}</div>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\
          <span>\${action.title}</span>\
        </div>\
        <div class='mb-3'>\
          <a href='https://doi.org/\${action.DOI}' target='_blank' rel='noopener' title='Open article' aria-label='Open article: \${action.title}' class='${ACTION_ARTICLE_LINK_CLASSES} ml-0'>Open article <span aria-hidden='true'>&#8599;</span></a>\
        </div>\
        <div class='${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>OA status: <span class='font-medium'>\${action.oa_status}<span></div>\
        <div class='${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>License: <span class='font-medium uppercase'>\${action.publisher_license_best}</span></div>\
      </td>\
      <td class='${ACTION_TABLE_CELL_CLASSES}'>\
        <div class='mb-3 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.invoice_date}</div>\
        <div class='mb-3 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.invoice_number}</div>\
        <div class='${ACTION_TABLE_SECONDARY_TEXT_CLASSES} uppercase'>US$\${action.apc_cost}</div>\
      </td>`
  },
  {
    id: "unanswered_requests",
    keys: [
      "title",
      "journal",
      "author_email_name",
      "email",
      "DOI",
      "supplements.program__bmgf",
      "supplements.grantid__bmgf",
      "mailto"
    ],
    rowTemplate: `<td class='${ACTION_TABLE_CELL_CLASSES}'>\
        <div class='mb-1 font-medium ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.program__bmgf}</div>\
        <div class='${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.grantid__bmgf}</div>\
      </td>\
      <td class='${ACTION_TABLE_CELL_CLASSES}'>\
        <div class='mb-1 font-medium ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.author_email_name}</div>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.journal}</div>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\
          <span>\${action.title}</span>\
        </div>\
        <div class='mb-1'>\
          <a href='https://doi.org/\${action.DOI}' target='_blank' rel='noopener' title='Open article' aria-label='Open article: \${action.title}' class='${ACTION_ARTICLE_LINK_CLASSES} ml-0'>Open article <span aria-hidden='true'>&#8599;</span></a>\
        </div>\
      </td>\
      <td class='whitespace-nowrap ${ACTION_TABLE_CENTER_CELL_CLASSES} font-medium'>\
        <button \
          class='${ACTION_TABLE_DRAFT_BUTTON_CLASSES}'\
          aria-label='\${action.draft_aria_label}'\
          data-email='\${action.email}'\
          data-doi='\${action.DOI}'\
          data-mailto='\${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
        </button>\
      </td>`
  },
  {
    id: "email_author_deposit",
    keys: ["published_date", "title", "journal", "author_email_name", "email", "DOI", "mailto"],
    rowTemplate: `<td class='${ACTION_TABLE_CELL_CLASSES}'>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.published_date}</div>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.journal}</div>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\
          <span>\${action.title}</span>\
        </div>\
        <div class='mb-1'>\
          <a href='https://doi.org/\${action.DOI}' target='_blank' rel='noopener' title='Open article' aria-label='Open article: \${action.title}' class='${ACTION_ARTICLE_LINK_CLASSES} ml-0'>Open article <span aria-hidden='true'>&#8599;</span></a>\
        </div>\
      </td>\
      <td class='${ACTION_TABLE_OPTIONAL_CELL_CLASSES} ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.author_email_name}</div>\
      </td>\
      <td class='${ACTION_TABLE_CENTER_CELL_CLASSES} ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\
        <button \
          class='${ACTION_TABLE_DRAFT_BUTTON_CLASSES}'\
          aria-label='\${action.draft_aria_label}'\
          data-email='\${action.email}'\
          data-doi='\${action.DOI}'\
          data-mailto='\${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
        </button>\
      </td>`
  },
  {
    id: "email_author_aam",
    keys: ["published_date", "title", "journal", "author_email_name", "email", "DOI", "mailto"],
    rowTemplate: `<td class='${ACTION_TABLE_CELL_CLASSES}'>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.published_date}</div>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.journal}</div>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\
          <span>\${action.title}</span>\
        </div>\
        <div class='mb-1'>\
          <a href='https://doi.org/\${action.DOI}' target='_blank' rel='noopener' title='Open article' aria-label='Open article: \${action.title}' class='${ACTION_ARTICLE_LINK_CLASSES} ml-0'>Open article <span aria-hidden='true'>&#8599;</span></a>\
        </div>\
      </td>\
      <td class='${ACTION_TABLE_OPTIONAL_CELL_CLASSES} ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.author_email_name}</div>\
      </td>\
      <td class='${ACTION_TABLE_CENTER_CELL_CLASSES} ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\
        <button \
          class='${ACTION_TABLE_DRAFT_BUTTON_CLASSES}'\
          aria-label='\${action.draft_aria_label}'\
          data-email='\${action.email}'\
          data-doi='\${action.DOI}'\
          data-mailto='\${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
        </button>\
      </td>`
  },
  {
    id: "email_author_vor",
    keys: ["published_date", "title", "journal", "author_email_name", "email", "DOI", "mailto"],
    rowTemplate: `<td class='${ACTION_TABLE_CELL_CLASSES}'>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.published_date}</div>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.journal}</div>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\
          <span>\${action.title}</span>\
        </div>\
        <div class='mb-1'>\
          <a href='https://doi.org/\${action.DOI}' target='_blank' rel='noopener' title='Open article' aria-label='Open article: \${action.title}' class='${ACTION_ARTICLE_LINK_CLASSES} ml-0'>Open article <span aria-hidden='true'>&#8599;</span></a>\
        </div>\
      </td>\
      <td class='${ACTION_TABLE_OPTIONAL_CELL_CLASSES} ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.author_email_name}</div>\
      </td>\
      <td class='${ACTION_TABLE_CENTER_CELL_CLASSES} ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\
        <button \
          class='${ACTION_TABLE_DRAFT_BUTTON_CLASSES}'\
          aria-label='\${action.draft_aria_label}'\
          data-email='\${action.email}'\
          data-doi='\${action.DOI}'\
          data-mailto='\${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
        </button>\
      </td>`
  },
  {
    id: "email_author_unpublished_openrxiv_preprint_not_ccby",
    keys: ["published_date", "title", "journal", "author_email_name", "email", "DOI", "mailto", "publisher_license", "supplements.host_venue.display_name"],
    rowTemplate: `<td class='${ACTION_TABLE_CELL_CLASSES}'>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.published_date}</div>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.journal}</div>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\
          <span>\${action.title}</span>\
        </div>\
        <div class='mb-1'>\
          <a href='https://doi.org/\${action.DOI}' target='_blank' rel='noopener' title='Open article' aria-label='Open article: \${action.title}' class='${ACTION_ARTICLE_LINK_CLASSES} ml-0'>Open article <span aria-hidden='true'>&#8599;</span></a>\
        </div>\
        <div class='${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>License: <span class='font-medium uppercase'>\${action.publisher_license}</span></div>\
      </td>\
      <td class='${ACTION_TABLE_OPTIONAL_CELL_CLASSES} ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.author_email_name}</div>\
      </td>\
      <td class='${ACTION_TABLE_OPTIONAL_CENTER_CELL_CLASSES} ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\
        <button \
          class='${ACTION_TABLE_DRAFT_BUTTON_CLASSES}'\
          aria-label='\${action.draft_aria_label}'\
          data-email='\${action.email}'\
          data-doi='\${action.DOI}'\
          data-mailto='\${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
        </button>\
      </td>`
  },
  {
    id: "point_of_award_check",
    keys: ["published_date", "title", "journal", "DOI", "has_epmc_fulltext", "epmc_licence"],
    emptyStateMessage: "No non-compliant articles found for this author. <br>This author’s articles currently meet Wellcome’s point-of-award open access policy.",
    requiresSingleAuthor: true,
    rowTemplate: `<td class='${ACTION_TABLE_CELL_CLASSES}' data-doi='\${action.DOI}' data-in-epmc='\${action.has_epmc_fulltext}' data-epmc-licence='\${action.epmc_licence}'>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.published_date}</div>\
        <div class='mb-1 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.journal}</div>\
        <div class='mb-1 ${ACTION_TABLE_PRIMARY_TEXT_CLASSES}'>\${action.title}</div>\
        <div class='mb-2 ${ACTION_TABLE_SECONDARY_TEXT_CLASSES}'>\${action.DOI}</div>\
        <div class='mb-1'>\
          <a href='https://doi.org/\${action.DOI}' target='_blank' rel='noopener' title='Open article' aria-label='Open article: \${action.title}' class='${ACTION_ARTICLE_LINK_CLASSES} ml-0'>Open article <span aria-hidden='true'>&#8599;</span></a>\
        </div>\
      </td>\
      <td class='border-b border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-left text-neutral-100 align-top break-words'>\
        <span class='inline-flex items-center gap-1 font-medium'>\
          <span>\${action.epmc_status_label}</span>\
          <i class='ph \${action.epmc_status_icon} text-[16px] leading-none \${action.epmc_status_color}' aria-hidden='true'></i>\
        </span>\
      </td>\
      <td class='border-b border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-left text-neutral-100 align-top break-words'>\
        <span class='font-medium'>\${action.epmc_licence}</span>\
      </td>`
  }
];
