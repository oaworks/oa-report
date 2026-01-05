// =================================================
// constants/ui.js
// UI classes and table styling
// =================================================

/**
 * Class names for the report’s top-nav date or year selection buttons.
 * @type {{enabled:string,disabled:string,active:string}}
 */
export const DATE_SELECTION_BUTTON_CLASSES = {
  enabled: "block p-2 border rounded-t-sm mt-1 mr-1 md:mt-0 md:mr-3 md:border-b-0 bg-white text-neutral-900 hover:bg-carnation-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 js-nav-chip",
  disabled: "block p-2 border rounded-t-sm mt-1 mr-1 md:mt-0 md:mr-3 md:border-b-0 bg-white text-neutral-900 opacity-50 cursor-not-allowed js-nav-chip",
  active: "block p-2 border rounded-t-sm mt-1 mr-1 md:mt-0 md:mr-3 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 md:border-b-0 bg-neutral-900 text-white font-semibold border-neutral-900 js-nav-chip"
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
  active: 'bg-neutral-200 text-neutral-900 border-neutral-200 shadow-sm',
  inactive: 'bg-neutral-800 text-white border-neutral-500 hover:bg-neutral-700'
};
