// =================================================
// constants/ui.js
// UI classes and table styling
// =================================================

/**
 * Class names for the report’s top-nav date or year selection buttons.
 * @type {{enabled:string,disabled:string,active:string}}
 */
export const DATE_SELECTION_BUTTON_CLASSES = {
  enabled: "block px-2 py-1 border rounded-t-sm mt-1 md:mt-0 md:border-b-0 md:px-3 md:py-1.5 text-xs font-medium bg-neutral-800 text-neutral-100 hover:bg-neutral-700 border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600 js-nav-chip",
  disabled: "block px-2 py-1 border rounded-t-sm mt-1 md:mt-0 md:border-b-0 md:px-3 md:py-1.5 text-xs font-medium bg-neutral-800 text-neutral-500 opacity-60 cursor-not-allowed border-neutral-700 js-nav-chip",
  active: "block px-2 py-1 border rounded-t-sm mt-1 md:mt-0 md:border-b-0 md:px-3 md:py-1.5 text-xs font-semibold bg-neutral-200 text-neutral-900 border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-600 js-nav-chip"
};

/**
 * Class names for table header columns in the data explore section.
 */
export const DATA_TABLE_HEADER_CLASSES = {
  terms: {
    firstHeaderCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom",
    secondHeaderCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-600 p-2 w-24 md:w-32 align-bottom break-words",
    otherHeaderCols: "border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right"
  },
  articles: {
    firstHeaderCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 lg:w-80 align-bottom",
    secondHeaderCol: "border-b border-neutral-500 sticky left-32 md:left-60 lg:left-80 bg-neutral-600 p-2 w-24 md:w-32 align-bottom break-words",
    otherHeaderCols: "border-b border-r border-b-neutral-500 border-r-neutral-700 p-2 w-64 max-w-4xl align-bottom break-words"
  }
};

/**
 * Class names for table body (<tbody>) columns in the data explore section.
 */
export const DATA_TABLE_BODY_CLASSES = {
  terms: {
    firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 text-left",
    secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-600 p-2 w-24 md:w-32 whitespace-nowrap truncate",
    otherCols: "border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"
  },
  articles: {
    firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 lg:w-80 text-left",
    secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 lg:left-80 bg-neutral-600 p-2 w-24 md:w-32 whitespace-nowrap truncate",
    otherCols: "border-b border-neutral-500 p-2 w-64 max-w-4xl whitespace-nowrap truncate text-right hover:bg-neutral-600"
  }
};

/**
 * Class names for table foot (<tfoot>) columns in the data explore section.
 */
export const DATA_TABLE_FOOT_CLASSES = {
  terms: {
    firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-600 p-2 w-32 md:w-60 text-left",
    secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-500 p-2 w-24 md:w-32 whitespace-nowrap truncate",
    otherCols: "border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-500"
  },
  articles: {
    firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-600 p-2 w-32 md:w-60 lg:w-80 text-left",
    secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 lg:left-80 bg-neutral-500 p-2 w-24 md:w-32 whitespace-nowrap truncate",
    otherCols: "border-b border-neutral-500 p-2 w-64 max-w-4xl whitespace-nowrap truncate text-right hover:bg-neutral-500"
  }
};

/**
 * Class names for Explore filter pills.
 */
export const FILTER_PILL_CLASSES = {
  base: 'inline-flex items-center px-3 py-1 rounded-full border text-xs md:text-sm cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-800 whitespace-nowrap',
  active: 'bg-neutral-700 text-neutral-100 border-neutral-500 shadow-sm',
  inactive: 'bg-neutral-800 text-neutral-100 border-neutral-600 hover:bg-neutral-700'
};

// Segmented pill styles for tab-like groups
export const SEGMENTED_PILL_CLASSES = {
  base: "px-4 py-1.5 text-xs font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-800 hover:bg-neutral-700 transition-colors",
  active: "bg-neutral-100 text-neutral-900 shadow-inner hover:bg-neutral-200",
  inactive: "text-neutral-200 hover:bg-neutral-700"
};
