// ========================
// Constants/configurations
// ========================

export const readableDateOptions = {
  day: "numeric",
  month: "long",
  year: "numeric"
};

// Detect the user's locale
export const userLocale = navigator.languages && navigator.languages.length 
                        ? navigator.languages[0] 
                        : navigator.language;