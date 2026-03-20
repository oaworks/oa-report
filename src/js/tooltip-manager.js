let hasInitialisedTippy = false;

function initGroup(selector, options) {
  const tippy = window.tippy;
  if (typeof tippy !== "function") return;

  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  tippy(elements, options);
}

export function initTooltipManager() {
  if (hasInitialisedTippy) return;
  hasInitialisedTippy = true;

  window.addEventListener("load", () => {
    const tippy = window.tippy;
    if (typeof tippy !== "function") {
      return;
    }

    initGroup(".tooltip", {
      allowHTML: true,
      interactive: true,
      placement: "top",
      appendTo: document.body,
    });

    initGroup(".dropdown", {
      arrow: false,
      allowHTML: true,
      interactive: true,
      placement: "bottom-start",
      appendTo: document.body,
      theme: "dropdown",
    });

    initGroup(".popover", {
      allowHTML: true,
      interactive: true,
      placement: "bottom",
      appendTo: document.body,
      trigger: "click",
      theme: "popover",
      arrow: false,
    });

    document.querySelectorAll(".tooltip").forEach((tooltip) => {
      tooltip.setAttribute("role", "tooltip");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (typeof tippy.hideAll === "function") {
        tippy.hideAll();
      }
    });
  }, { once: true });
}

function getTippy() {
  return typeof window.tippy === "function" ? window.tippy : null;
}

export function createPopover(trigger, content, options = {}) {
  const tippy = getTippy();
  if (!tippy) {
    throw new Error("Tippy is not available.");
  }

  return tippy(trigger, {
    content,
    allowHTML: true,
    interactive: true,
    placement: "bottom",
    appendTo: document.body,
    trigger: "click",
    theme: "popover",
    arrow: false,
    ...options,
  });
}

export function createTooltip(trigger, content, options = {}) {
  const tippy = getTippy();
  if (!tippy) {
    throw new Error("Tippy is not available.");
  }

  return tippy(trigger, {
    content,
    allowHTML: true,
    interactive: true,
    placement: "top",
    appendTo: document.body,
    ...options,
  });
}
