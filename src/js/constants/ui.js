// =================================================
// constants/ui.js
// UI classes and table styling
// =================================================

/**
 * Class names for the report’s top-nav date or year selection buttons.
 * @type {{enabled:string,disabled:string,active:string}}
 */
export const DATE_SELECTION_BUTTON_CLASSES = {
  enabled: "inline-flex items-center px-2.5 py-1 md:px-3 border rounded-sm text-sm font-medium bg-neutral-800 text-white border-neutral-400 hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors js-nav-chip",
  disabled: "inline-flex items-center px-2.5 py-1 md:px-3 border rounded-sm text-sm font-medium bg-neutral-800 text-neutral-500 opacity-60 cursor-not-allowed border-neutral-700 js-nav-chip",
  active: "inline-flex items-center px-2.5 py-1 md:px-3 border rounded-sm text-sm font-semibold bg-neutral-200 text-neutral-900 border-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700 transition-colors js-nav-chip"
};

export const CONTROL_FOCUS_RING_CLASSES = "focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-900";
export const CONTROL_FIELD_SHELL_CLASSES = "rounded-sm border border-neutral-600 bg-neutral-900/50 p-0.5 shadow-sm transition-colors hover:border-neutral-400 focus-within:border-neutral-300";
export const CONTROL_SELECT_CLASSES = "appearance-none cursor-pointer rounded-sm bg-transparent px-3 py-1.5 pr-8 text-xs font-semibold uppercase tracking-wide text-neutral-100 transition-colors hover:bg-neutral-800 hover:text-white";
export const SORT_TRIGGER_CLASSES = `group cursor-pointer rounded-sm text-inherit transition-colors ${CONTROL_FOCUS_RING_CLASSES}`;
export const SORT_LABEL_CLASSES = "js-sort-label min-w-0 uppercase group-hover:underline group-focus-visible:underline underline-offset-2";
export const SORT_CARET_CHIP_CLASSES = "shrink-0 rounded-sm border border-neutral-500 bg-neutral-800 px-1 py-0.5 text-[10px] leading-none text-neutral-100 shadow-sm transition-colors group-hover:border-neutral-300 group-hover:bg-neutral-700 group-focus-visible:border-neutral-300 group-focus-visible:bg-neutral-700";
export const TAB_COUNT_BADGE_CLASSES = "ml-3 rounded-full bg-neutral-700 px-2.5 py-0.5 text-xs font-medium text-neutral-100 transition-colors group-hover:bg-neutral-600 md:inline-block";
export const EXPLORE_SUMMARY_ROW_CLASSES = {
  total: "border-t border-neutral-400 !bg-neutral-200 font-semibold text-neutral-900",
  missing: "!bg-neutral-200 font-semibold text-neutral-900"
};

/**
 * Class names for table header columns in the data explore section.
 */
export const DATA_TABLE_HEADER_CLASSES = {
  terms: {
    firstHeaderCol: "border-b border-r border-neutral-700 sticky left-0 bg-neutral-900 p-3 w-32 md:w-60 align-bottom",
    secondHeaderCol: "border-b border-r border-neutral-700 sticky left-32 md:left-60 bg-neutral-900 p-3 w-28 md:w-36 align-bottom break-words",
    otherHeaderCols: "border-b border-r border-neutral-700 p-3 w-32 align-bottom break-words"
  },
  articles: {
    firstHeaderCol: "border-b border-r border-neutral-700 sticky left-0 bg-neutral-900 p-3 w-32 md:w-60 lg:w-80 align-bottom",
    secondHeaderCol: "border-b border-r border-neutral-700 sticky left-32 md:left-60 lg:left-80 bg-neutral-900 p-3 w-28 md:w-36 align-bottom break-words",
    otherHeaderCols: "border-b border-r border-neutral-700 p-3 w-64 max-w-4xl align-bottom break-words"
  }
};

/**
 * Class names for table body (<tbody>) columns in the data explore section.
 */
export const DATA_TABLE_BODY_CLASSES = {
  terms: {
    firstCol: "border-b border-neutral-700 sticky left-0 bg-neutral-900 px-3 py-2 w-32 md:w-60 text-left text-neutral-100",
    secondCol: "border-b border-neutral-700 sticky left-32 md:left-60 bg-neutral-900 px-3 py-2 w-28 md:w-36 whitespace-nowrap truncate text-neutral-100",
    otherCols: "border-b border-neutral-700 bg-neutral-800 px-3 py-2 whitespace-nowrap truncate text-neutral-100 hover:bg-neutral-700"
  },
  articles: {
    firstCol: "border-b border-neutral-700 sticky left-0 bg-neutral-900 px-3 py-2 w-32 md:w-60 lg:w-80 text-left text-neutral-100",
    secondCol: "border-b border-neutral-700 sticky left-32 md:left-60 lg:left-80 bg-neutral-900 px-3 py-2 w-28 md:w-36 whitespace-nowrap truncate text-neutral-100",
    otherCols: "border-b border-neutral-700 bg-neutral-800 px-3 py-2 w-64 max-w-4xl whitespace-nowrap truncate text-neutral-100 hover:bg-neutral-700"
  }
};

/**
 * Class names for table foot (<tfoot>) columns in the data explore section.
 */
export const DATA_TABLE_FOOT_CLASSES = {
  terms: {
    firstCol: "border-b border-neutral-600 sticky left-0 bg-neutral-900 px-3 py-2 w-32 md:w-60 text-left text-neutral-100",
    secondCol: "border-b border-neutral-600 sticky left-32 md:left-60 bg-neutral-900 px-3 py-2 w-28 md:w-36 whitespace-nowrap truncate text-neutral-100",
    otherCols: "border-b border-neutral-600 bg-neutral-800 px-3 py-2 whitespace-nowrap truncate text-neutral-100 hover:bg-neutral-700"
  },
  articles: {
    firstCol: "border-b border-neutral-600 sticky left-0 bg-neutral-900 px-3 py-2 w-32 md:w-60 lg:w-80 text-left text-neutral-100",
    secondCol: "border-b border-neutral-600 sticky left-32 md:left-60 lg:left-80 bg-neutral-900 px-3 py-2 w-28 md:w-36 whitespace-nowrap truncate text-neutral-100",
    otherCols: "border-b border-neutral-600 bg-neutral-800 px-3 py-2 w-64 max-w-4xl whitespace-nowrap truncate text-neutral-100 hover:bg-neutral-700"
  }
};

// Segmented pill styles for tab-like groups
// TODO: Refactor Actions pills to consume these shared classes so Explore and Actions stay visually aligned from one source of truth.
export const SEGMENTED_PILL_CLASSES = {
  base: "px-4 py-1.5 text-sm font-medium rounded-md outline outline-1 outline-transparent outline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-800 transition-colors",
  active: "bg-neutral-100 text-neutral-900 shadow-inner border border-1 border-neutral-100",
  inactive: "bg-neutral-900 text-white hover:bg-neutral-800"
};

/**
 * Class names for Explore table view tabs.
 */
export const VIEW_TAB_CLASSES = {
  base: "inline-flex items-center border-b-4 px-0 pb-3 pt-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900",
  active: "border-carnation-300 text-white font-semibold",
  inactive: "border-transparent text-neutral-300 hover:border-neutral-200 hover:text-white"
};
