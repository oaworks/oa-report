import {
  arrow as floatingArrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";

const instances = new Set();
const DEFAULTS = {
  allowHTML: true,
  appendTo: document.body,
  arrow: true,
  delay: 0,
  hideOnClick: true,
  interactive: true,
  maxWidth: undefined,
  placement: "top",
  role: "tooltip",
  theme: "",
  trigger: "mouseenter focus",
};
const INTERACTIVE_HIDE_GRACE_MS = 120;

let hasInitialised = false;
let nextId = 0;

function uid() {
  nextId += 1;
  return `floating-ui-${nextId}`;
}

function parseDelay(value) {
  return Array.isArray(value)
    ? [value[0] || 0, value[1] || 0]
    : [value || 0, value || 0];
}

function resolveAppendTarget(appendTo, trigger) {
  if (typeof appendTo === "function") return appendTo(trigger);
  return appendTo instanceof HTMLElement ? appendTo : document.body;
}

function contains(node, target) {
  return target instanceof Node && node.contains(target);
}

function getFallbackPlacements(placement) {
  const [side, align] = String(placement || "top").split("-");
  const opposite = { top: "bottom", right: "left", bottom: "top", left: "right" }[side] || "bottom";
  return [
    align ? `${opposite}-${align}` : opposite,
    opposite,
    side === "top" || side === "bottom" ? "right" : "top",
    side === "top" || side === "bottom" ? "left" : "bottom",
  ];
}

function setContent(target, value, allowHTML) {
  target.replaceChildren();

  if (value instanceof Node) {
    target.appendChild(value);
    return;
  }

  if (allowHTML) {
    target.innerHTML = String(value ?? "");
    return;
  }

  target.textContent = String(value ?? "");
}

function setArrowPosition(box, arrowEl, placement, arrowData) {
  if (!arrowEl) return;

  arrowEl.style.left = typeof arrowData?.x === "number" ? `${arrowData.x}px` : "";
  arrowEl.style.top = typeof arrowData?.y === "number" ? `${arrowData.y}px` : "";
  arrowEl.style.right = "";
  arrowEl.style.bottom = "";

  box.setAttribute("data-placement", placement);
}

function createElements(options) {
  const popper = document.createElement("div");
  popper.id = uid();
  Object.assign(popper.style, {
    position: "absolute",
    left: "0",
    top: "0",
    zIndex: "9999",
  });

  const box = document.createElement("div");
  box.className = "tooltip-box";
  box.tabIndex = -1;
  box.dataset.state = "hidden";
  if (options.theme) box.dataset.theme = options.theme;
  if (options.role) box.setAttribute("role", options.role);
  if (options.maxWidth) {
    box.style.maxWidth = typeof options.maxWidth === "number" ? `${options.maxWidth}px` : options.maxWidth;
  }

  const content = document.createElement("div");
  content.className = "tooltip-content";
  box.appendChild(content);

  const arrowEl = options.arrow === false
    ? null
    : Object.assign(document.createElement("div"), { className: "tooltip-arrow" });

  if (arrowEl) box.appendChild(arrowEl);
  popper.appendChild(box);

  return { popper, box, content, arrowEl };
}

function bind(cleanups, element, eventName, handler) {
  element.addEventListener(eventName, handler);
  cleanups.push(() => element.removeEventListener(eventName, handler));
}

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((element) => !element.hasAttribute("hidden"));
}

function isFocusableElement(element) {
  return element instanceof HTMLElement
    && !element.hasAttribute("hidden")
    && !element.hasAttribute("disabled")
    && element.tabIndex >= 0;
}

function getDocumentFocusableElements() {
  return Array.from(document.querySelectorAll(
    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )).filter(isFocusableElement);
}

function moveFocusOutsidePopover(trigger, popper, reverse = false) {
  const focusables = getDocumentFocusableElements().filter(
    (element) => !contains(popper, element)
  );
  const current = reverse ? trigger : document.activeElement;
  const index = focusables.indexOf(current);

  if (reverse) {
    const target = index > 0 ? focusables[index - 1] : trigger;
    target?.focus();
    return;
  }

  const triggerIndex = focusables.indexOf(trigger);
  const target = triggerIndex > -1 && triggerIndex < focusables.length - 1
    ? focusables[triggerIndex + 1]
    : null;

  target?.focus();
}

function focusTooltipContent(popper, reverse = false) {
  const focusable = getFocusableElements(popper);
  if (!focusable.length) return false;

  (reverse ? focusable[focusable.length - 1] : focusable[0]).focus();
  return true;
}

function scheduleHideIfOutside(trigger, popper, queueHide) {
  requestAnimationFrame(() => {
    const active = document.activeElement;
    if (contains(trigger, active) || contains(popper, active)) return;
    queueHide();
  });
}

function attachTriggers({
  trigger,
  popper,
  options,
  cleanups,
  queueShow,
  queueHide,
  cancelHide,
  show,
  hide,
  isVisible,
}) {
  const modes = String(options.trigger).split(" ").filter(Boolean);

  if (modes.includes("mouseenter")) {
    bind(cleanups, trigger, "mouseenter", queueShow);
    bind(cleanups, trigger, "mouseleave", (event) => {
      if (options.interactive && contains(popper, event.relatedTarget)) return;
      queueHide();
    });

    if (options.interactive) {
      bind(cleanups, popper, "mouseenter", cancelHide);
      bind(cleanups, popper, "mouseleave", (event) => {
        if (contains(trigger, event.relatedTarget)) return;
        queueHide();
      });
    }
  }

  if (modes.includes("focus")) {
    bind(cleanups, trigger, "focus", queueShow);
    bind(cleanups, trigger, "blur", () => {
      if (!options.interactive) {
        queueHide();
        return;
      }
      scheduleHideIfOutside(trigger, popper, queueHide);
    });

  }

  if (options.interactive) {
    bind(cleanups, trigger, "focusout", () => {
      scheduleHideIfOutside(trigger, popper, queueHide);
    });

    bind(cleanups, trigger, "keydown", (event) => {
      if (event.key !== "Tab" || event.shiftKey) return;
      if (!isVisible()) return;
      if (!focusTooltipContent(popper)) return;
      event.preventDefault();
    });
  }

  if (options.interactive) {
    bind(cleanups, popper, "focusin", cancelHide);
    bind(cleanups, popper, "focusout", () => {
      scheduleHideIfOutside(trigger, popper, queueHide);
    });

    bind(cleanups, popper, "keydown", (event) => {
      if (!isVisible()) return;

      if (event.key === "Escape") {
        event.preventDefault();
        hide();
        trigger.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(popper);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        hide();
        moveFocusOutsidePopover(trigger, popper, true);
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        hide();
        moveFocusOutsidePopover(trigger, popper);
        return;
      }
    });
  }

  if (modes.includes("click")) {
    bind(cleanups, trigger, "click", (event) => {
      event.preventDefault();
      if (isVisible()) {
        if (options.hideOnClick !== false) hide();
        return;
      }
      show();
    });

    bind(cleanups, document, "pointerdown", (event) => {
      if (!isVisible()) return;
      if (contains(trigger, event.target) || contains(popper, event.target)) return;
      hide();
    });
  }
}

function createFloating(trigger, initialContent, overrides = {}) {
  const options = { ...DEFAULTS, ...overrides };
  const { popper, box, content, arrowEl } = createElements(options);
  const [showDelay, hideDelay] = parseDelay(options.delay);
  const appendTarget = resolveAppendTarget(options.appendTo, trigger);
  const middleware = [
    offset(options.arrow === false ? 8 : 7),
    flip({
      padding: 8,
      fallbackPlacements: getFallbackPlacements(options.placement),
    }),
    shift({
      padding: 8,
      crossAxis: true,
    }),
  ];

  if (arrowEl) middleware.push(floatingArrow({ element: arrowEl }));

  let currentContent = initialContent;
  let cleanupPosition = null;
  let showTimer = null;
  let hideTimer = null;
  let visible = false;
  let destroyed = false;
  const cleanups = [];

  const instance = {
    reference: trigger,
    popper,
    props: options,
    show,
    hide,
    destroy,
    setContent(value) {
      currentContent = value;
      render();
      updatePosition();
    },
  };

  function isVisible() {
    return visible && !destroyed;
  }

  function clearTimers() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
  }

  function render() {
    setContent(content, currentContent, options.allowHTML);
  }

  function updatePosition() {
    if (!isVisible()) return;

    computePosition(trigger, popper, {
      placement: options.placement,
      middleware,
    }).then(({ x, y, placement, middlewareData }) => {
      if (!isVisible()) return;
      popper.style.left = `${x}px`;
      popper.style.top = `${y}px`;
      setArrowPosition(box, arrowEl, placement, middlewareData.arrow);
    });
  }

  function mount() {
    render();
    if (!appendTarget.contains(popper)) appendTarget.appendChild(popper);
    cleanupPosition = autoUpdate(trigger, popper, updatePosition);
    box.dataset.state = "visible";
    updatePosition();
  }

  function unmount() {
    cleanupPosition?.();
    cleanupPosition = null;
    box.dataset.state = "hidden";
    popper.remove();
  }

  function show() {
    if (isVisible()) return;
    if (typeof options.onShow === "function" && options.onShow(instance) === false) return;

    clearTimers();
    visible = true;
    mount();
    options.onMount?.(instance);
    requestAnimationFrame(() => {
      if (isVisible()) options.onShown?.(instance);
    });
  }

  function hide({ skipHook = false } = {}) {
    if (!isVisible()) return;
    if (!skipHook && typeof options.onHide === "function" && options.onHide(instance) === false) return;

    clearTimers();
    visible = false;
    unmount();
  }

  function destroy() {
    if (destroyed) return;
    clearTimers();
    hide({ skipHook: true });
    destroyed = true;
    cleanups.forEach((cleanup) => cleanup());
    instances.delete(instance);
    if (trigger._tooltip === instance) delete trigger._tooltip;
    if (popper._tooltip === instance) delete popper._tooltip;
    options.onDestroy?.(instance);
  }

  function queueShow() {
    cancelHide();
    clearTimeout(showTimer);
    showTimer = setTimeout(show, showDelay);
  }

  function queueHide() {
    clearTimeout(showTimer);
    cancelHide();
    const delay = options.interactive ? Math.max(hideDelay, INTERACTIVE_HIDE_GRACE_MS) : hideDelay;
    hideTimer = setTimeout(hide, delay);
  }

  function cancelHide() {
    clearTimeout(hideTimer);
  }

  attachTriggers({
    trigger,
    popper,
    options,
    cleanups,
    queueShow,
    queueHide,
    cancelHide,
    show,
    hide,
    isVisible,
  });

  trigger._tooltip = instance;
  popper._tooltip = instance;
  instances.add(instance);

  return instance;
}

function initDeclarativeTooltips() {
  document.querySelectorAll(".tooltip").forEach((element) => {
    if (element._tooltip) return;

    const content = element.getAttribute("data-tooltip-content");
    if (!content) return;

    createTooltip(element, content, {
      placement: element.getAttribute("data-tooltip-placement") || "top",
      theme: element.getAttribute("data-tooltip-theme") || "",
    });

    element.setAttribute("role", "tooltip");
  });
}

export function initTooltipManager() {
  if (hasInitialised) return;
  hasInitialised = true;

  window.addEventListener("load", () => {
    initDeclarativeTooltips();
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      instances.forEach((instance) => instance.hide());
    });
  }, { once: true });
}

export function createPopover(trigger, content, options = {}) {
  return createFloating(trigger, content, {
    interactive: true,
    placement: "bottom",
    trigger: "click",
    theme: "popover",
    arrow: false,
    ...options,
  });
}

export function createTooltip(trigger, content, options = {}) {
  return createFloating(trigger, content, {
    interactive: true,
    placement: "top",
    trigger: "mouseenter focus",
    theme: "",
    arrow: true,
    ...options,
  });
}
