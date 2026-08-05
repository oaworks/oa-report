// =================================================
// constants/ui.js
// UI classes and table styling
// =================================================

/**
 * Class names for the report’s top-nav date or year selection buttons.
 * @type {{enabled:string,disabled:string,active:string}}
 */
export const DATE_SELECTION_BUTTON_CLASSES = {
  enabled: "inline-flex items-center rounded-sm border border-neutral-300 bg-white px-2.5 py-1 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white md:px-3 js-nav-chip",
  disabled: "inline-flex items-center rounded-sm border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-sm font-medium text-neutral-400 opacity-60 cursor-not-allowed md:px-3 js-nav-chip",
  active: "inline-flex items-center rounded-sm border border-neutral-900 bg-neutral-900 px-2.5 py-1 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white md:px-3 js-nav-chip"
};

export const CONTROL_FOCUS_RING_CLASSES = "focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white";
export const CONTROL_FIELD_SHELL_CLASSES = "rounded-sm border border-neutral-300 bg-white p-0.5 transition-colors hover:border-neutral-400 focus-within:border-neutral-400";
export const CONTROL_SELECT_CLASSES = "appearance-none cursor-pointer rounded-sm bg-transparent px-3 py-1.5 pr-8 text-xs font-semibold uppercase tracking-wide text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900";
export const SORT_TRIGGER_CLASSES = `group cursor-pointer rounded-sm text-inherit transition-colors ${CONTROL_FOCUS_RING_CLASSES}`;
export const SORT_LABEL_CLASSES = "js-sort-label min-w-0 uppercase group-hover:underline group-focus-visible:underline underline-offset-2";
export const SORT_CARET_CHIP_CLASSES = "shrink-0 rounded-sm border border-neutral-300 bg-white px-1 py-0.5 text-[10px] leading-none text-neutral-700 transition-colors group-hover:border-neutral-400 group-hover:bg-neutral-100 group-focus-visible:border-neutral-400 group-focus-visible:bg-neutral-100";
export const TAB_COUNT_BADGE_CLASSES = "ml-3 rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-800 transition-colors group-hover:bg-neutral-200 md:inline-block";
export const EXPLORE_SUMMARY_ROW_CLASSES = {
  total: "border-t-2 border-neutral-300 !bg-neutral-100 font-semibold text-neutral-900",
  missing: "!bg-neutral-100 font-semibold text-neutral-900"
};

/**
 * Class names for table header columns in the data explore section.
 */
export const DATA_TABLE_HEADER_CLASSES = {
  terms: {
    firstHeaderCol: "sticky left-0 w-32 border-b border-r border-neutral-300 bg-neutral-200 p-3 align-bottom text-neutral-900 md:w-60",
    secondHeaderCol: "sticky left-32 w-28 border-b border-r border-neutral-300 bg-neutral-200 p-3 align-bottom break-words text-neutral-900 md:left-60 md:w-36",
    otherHeaderCols: "w-32 border-b border-r border-neutral-300 bg-neutral-200 p-3 align-bottom break-words text-neutral-900"
  },
  articles: {
    firstHeaderCol: "sticky left-0 w-32 border-b border-r border-neutral-300 bg-neutral-200 p-3 align-bottom text-neutral-900 md:w-60 lg:w-80",
    secondHeaderCol: "sticky left-32 w-28 border-b border-r border-neutral-300 bg-neutral-200 p-3 align-bottom break-words text-neutral-900 md:left-60 md:w-36 lg:left-80",
    otherHeaderCols: "w-64 max-w-4xl border-b border-r border-neutral-300 bg-neutral-200 p-3 align-bottom break-words text-neutral-900"
  }
};

/**
 * Class names for table body (<tbody>) columns in the data explore section.
 */
export const DATA_TABLE_BODY_CLASSES = {
  terms: {
    firstCol: "sticky left-0 w-32 border-b border-neutral-200 bg-neutral-100 px-3 py-2 text-left text-neutral-900 md:w-60",
    secondCol: "sticky left-32 w-28 border-b border-neutral-200 bg-neutral-100 px-3 py-2 whitespace-nowrap truncate text-neutral-900 md:left-60 md:w-36",
    otherCols: "border-b border-neutral-200 bg-white px-3 py-2 whitespace-nowrap truncate text-neutral-900 hover:bg-neutral-50"
  },
  articles: {
    firstCol: "sticky left-0 w-32 border-b border-neutral-200 bg-neutral-100 px-3 py-2 text-left text-neutral-900 md:w-60 lg:w-80",
    secondCol: "sticky left-32 w-28 border-b border-neutral-200 bg-neutral-100 px-3 py-2 whitespace-nowrap truncate text-neutral-900 md:left-60 md:w-36 lg:left-80",
    otherCols: "w-64 max-w-4xl border-b border-neutral-200 bg-white px-3 py-2 whitespace-nowrap truncate text-neutral-900 hover:bg-neutral-50"
  }
};

/**
 * Class names for table foot (<tfoot>) columns in the data explore section.
 */
export const DATA_TABLE_FOOT_CLASSES = {
  terms: {
    firstCol: "sticky left-0 w-32 border-b border-neutral-300 bg-neutral-100 px-3 py-2 text-left text-neutral-900 md:w-60",
    secondCol: "sticky left-32 w-28 border-b border-neutral-300 bg-neutral-100 px-3 py-2 whitespace-nowrap truncate text-neutral-900 md:left-60 md:w-36",
    otherCols: "border-b border-neutral-300 bg-neutral-100 px-3 py-2 whitespace-nowrap truncate text-neutral-900 hover:bg-neutral-50"
  },
  articles: {
    firstCol: "sticky left-0 w-32 border-b border-neutral-300 bg-neutral-100 px-3 py-2 text-left text-neutral-900 md:w-60 lg:w-80",
    secondCol: "sticky left-32 w-28 border-b border-neutral-300 bg-neutral-100 px-3 py-2 whitespace-nowrap truncate text-neutral-900 md:left-60 md:w-36 lg:left-80",
    otherCols: "w-64 max-w-4xl border-b border-neutral-300 bg-neutral-100 px-3 py-2 whitespace-nowrap truncate text-neutral-900 hover:bg-neutral-50"
  }
};

// Segmented pill styles for tab-like groups
// TODO: Refactor Actions pills to consume these shared classes so Explore and Actions stay visually aligned from one source of truth.
export const SEGMENTED_PILL_CLASSES = {
  base: "rounded-md px-4 py-1.5 text-sm font-medium shadow-md outline outline-1 outline-transparent outline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white",
  active: "border border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800",
  inactive: "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
};

/**
 * Class names for Explore table view tabs.
 */
export const VIEW_TAB_CLASSES = {
  base: "inline-flex items-center border-b-4 px-0 pb-3 pt-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
  active: "border-carnation-300 text-neutral-900 font-semibold",
  inactive: "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
};
