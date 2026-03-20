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

  const side = placement.split("-")[0];
  const opposite = { top: "bottom", right: "left", bottom: "top", left: "right" }[side];

  arrowEl.style.left = typeof arrowData?.x === "number" ? `${arrowData.x}px` : "";
  arrowEl.style.top = typeof arrowData?.y === "number" ? `${arrowData.y}px` : "";
  arrowEl.style.right = "";
  arrowEl.style.bottom = "";
  arrowEl.style[opposite] = "-8px";

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
  box.className = "tippy-box";
  box.tabIndex = -1;
  box.dataset.state = "hidden";
  if (options.theme) box.dataset.theme = options.theme;
  if (options.role) box.setAttribute("role", options.role);
  if (options.maxWidth) {
    box.style.maxWidth = typeof options.maxWidth === "number" ? `${options.maxWidth}px` : options.maxWidth;
  }

  const content = document.createElement("div");
  content.className = "tippy-content";
  box.appendChild(content);

  const arrowEl = options.arrow === false
    ? null
    : Object.assign(document.createElement("div"), { className: "tippy-arrow" });

  if (arrowEl) box.appendChild(arrowEl);
  popper.appendChild(box);

  return { popper, box, content, arrowEl };
}

function bind(cleanups, element, eventName, handler) {
  element.addEventListener(eventName, handler);
  cleanups.push(() => element.removeEventListener(eventName, handler));
}

function bindHoverEvents(state) {
  const { trigger, popper, options, clearTimers, queueShow, queueHide, cleanups } = state;

  bind(cleanups, trigger, "mouseenter", queueShow);
  bind(cleanups, trigger, "mouseleave", (event) => {
    if (options.interactive && event.relatedTarget instanceof Node && popper.contains(event.relatedTarget)) return;
    queueHide();
  });

  if (!options.interactive) return;

  bind(cleanups, popper, "mouseenter", () => clearTimeout(state.hideTimer));
  bind(cleanups, popper, "mouseleave", (event) => {
    if (event.relatedTarget instanceof Node && trigger.contains(event.relatedTarget)) return;
    queueHide();
  });
}

function bindFocusEvents(state) {
  const { trigger, popper, options, queueShow, queueHide, cleanups } = state;

  bind(cleanups, trigger, "focus", queueShow);
  bind(cleanups, trigger, "blur", (event) => {
    if (options.interactive && event.relatedTarget instanceof Node && popper.contains(event.relatedTarget)) return;
    queueHide();
  });
}

function bindClickEvents(state) {
  const { trigger, popper, options, cleanups, show, hide, isVisible } = state;

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
    const target = event.target;
    if (target instanceof Node && (trigger.contains(target) || popper.contains(target))) return;
    hide();
  });
}

function attachTriggers(state) {
  const modes = String(state.options.trigger).split(" ").filter(Boolean);
  if (modes.includes("mouseenter")) bindHoverEvents(state);
  if (modes.includes("focus")) bindFocusEvents(state);
  if (modes.includes("click")) bindClickEvents(state);
}

function createFloating(trigger, initialContent, overrides = {}) {
  const options = { ...DEFAULTS, ...overrides };
  const { popper, box, content, arrowEl } = createElements(options);
  const [showDelay, hideDelay] = parseDelay(options.delay);
  const appendTarget = resolveAppendTarget(options.appendTo, trigger);
  const middleware = [offset(10), flip(), shift({ padding: 8 })];

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
    if (trigger._tippy === instance) delete trigger._tippy;
    if (popper._tippy === instance) delete popper._tippy;
    options.onDestroy?.(instance);
  }

  function queueShow() {
    clearTimeout(hideTimer);
    clearTimeout(showTimer);
    showTimer = setTimeout(show, showDelay);
  }

  function queueHide() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, hideDelay);
  }

  attachTriggers({
    trigger,
    popper,
    options,
    cleanups,
    clearTimers,
    queueShow,
    queueHide,
    show,
    hide,
    isVisible,
    get hideTimer() {
      return hideTimer;
    },
  });

  trigger._tippy = instance;
  popper._tippy = instance;
  instances.add(instance);

  return instance;
}

function initDeclarativeTooltips() {
  document.querySelectorAll(".tooltip").forEach((element) => {
    if (element._tippy) return;

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
