// ================================================
// constants/actions.js
// Human-readable labels and order for Actions tabs
// ================================================

export const ACTION_LABELS = {
  email_author_deposit: "Self-archive articles",
  email_author_vor: "Deposit publisher PDFs",
  email_author_aam: "Deposit accepted manuscripts",
  apc_followup: "Correct publisher errors",
  unanswered_requests: "Escalate unanswered requests"
};

export const ACTION_ORDER = [
  "email_author_deposit",
  "email_author_vor",
  "email_author_aam",
  "apc_followup",
  "unanswered_requests"
];

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
      "publisher_license",
      "journal_oa_type",
      "oa_status",
      "supplements.apc_cost",
      "supplements.invoice_number",
      "supplements.invoice_date"
    ],
    rowTemplate: "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>${action.publisher}</div>\
        <div class='mb-3 text-neutral-900'>${action.journal}</div>\
        <div class='text-neutral-600'>OA type: <span class='font-medium'>${action.journal_oa_type}</span></div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-600'>${action.published_date}</div>\
        <div class='mb-1 text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='mb-3 text-neutral-600'>${action.DOI}</div>\
        <div class='text-neutral-600'>OA status: <span class='font-medium'>${action.oa_status}<span></div>\
        <div class='text-neutral-600'>License: <span class='font-medium uppercase'>${action.publisher_license}</span></div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-3 text-neutral-600'>${action.invoice_date}</div>\
        <div class='mb-3 text-neutral-900'>${action.invoice_number}</div>\
        <div class='text-neutral-600 uppercase'>US$${action.apc_cost}</div>\
      </td>"
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
    rowTemplate: "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>${action.program__bmgf}</div>\
        <div class='text-neutral-900'>${action.grantid__bmgf}</div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>${action.author_email_name}</div>\
        <div class='mb-1 text-neutral-900'>\
          <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='text-neutral-600'>${action.journal}</div>\
      </td>\
      <td class='whitespace-nowrap py-4 pl-3 pr-4 text-center align-top text-sm font-medium'>\
        <button \
          class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
          data-email='${action.email}'\
          data-doi='${action.DOI}'\
          data-mailto='${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
        </button>\
      </td>"
  },
  {
    id: "email_author_deposit",
    keys: ["published_date", "title", "journal", "author_email_name", "email", "DOI", "mailto"],
    rowTemplate: "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-600'>${action.published_date}</div>\
        <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='text-neutral-600'>${action.journal}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-neutral-600 align-top break-words sm:table-cell'>\
        <div class='mb-1 text-neutral-900'>${action.author_email_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-center text-neutral-600 align-top break-words sm:table-cell'>\
        <button \
          class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
          data-email='${action.email}'\
          data-doi='${action.DOI}'\
          data-mailto='${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
        </button>\
      </td>"
  },
  {
    id: "email_author_aam",
    keys: ["published_date", "title", "journal", "author_email_name", "email", "DOI", "mailto"],
    rowTemplate: "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-600'>${action.published_date}</div>\
        <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='text-neutral-600'>${action.journal}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-neutral-600 align-top break-words sm:table-cell'>\
        <div class='mb-1 text-neutral-900'>${action.author_email_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-center text-neutral-600 align-top break-words sm:table-cell'>\
        <button \
          class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
          data-email='${action.email}'\
          data-doi='${action.DOI}'\
          data-mailto='${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
        </button>\
      </td>"
  },
  {
    id: "email_author_vor",
    keys: ["published_date", "title", "journal", "author_email_name", "email", "DOI", "mailto"],
    rowTemplate: "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-600'>${action.published_date}</div>\
        <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='text-neutral-600'>${action.journal}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-neutral-600 align-top break-words sm:table-cell'>\
        <div class='mb-1 text-neutral-900'>${action.author_email_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-center text-neutral-600 align-top break-words sm:table-cell'>\
        <button \
          class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
          data-email='${action.email}'\
          data-doi='${action.DOI}'\
          data-mailto='${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
        </button>\
      </td>"
  }
];
