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
