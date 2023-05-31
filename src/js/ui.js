/* Display tab contents on UI tab selection (MD + larger viewports) */
const strategyTabBtns = document.querySelectorAll(".js-tab-btn");

function handleTabBtnClick(event) {
  const tabBtn = event.target;
  const selectedStrategy = tabBtn.getAttribute("aria-controls");
  const selectedTabContents = document.querySelector(`.js-tab-content-all #${selectedStrategy}`);
  const otherTabContents = document.querySelectorAll(`.js-tab-content:not(#${selectedStrategy})`);
  const otherTabBtns = document.querySelectorAll(`.js-tab-btn:not(#tab_${selectedStrategy})`);

  for (let tabContents of otherTabContents) {
    tabContents.classList.add("hidden");
    tabContents.setAttribute("hidden", true);
  }

  for (let unselectedTabBtn of otherTabBtns) {
    unselectedTabBtn.classList.remove("border-t-neutral-900", "text-neutral-900", "font-bold");
    unselectedTabBtn.classList.add("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
    unselectedTabBtn.setAttribute("aria-selected", "false");
    unselectedTabBtn.setAttribute("tabindex", "-1");
  }

  selectedTabContents.classList.remove("hidden");
  selectedTabContents.removeAttribute("hidden");

  tabBtn.classList.add("border-t-neutral-900", "text-neutral-900", "font-bold");
  tabBtn.classList.remove("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
  tabBtn.setAttribute("aria-selected", "true");
  tabBtn.setAttribute("tabindex", "0");
}

strategyTabBtns.forEach((tabBtn) => {
  tabBtn.addEventListener("click", handleTabBtnClick);
});

/* Quick selects pills */
const quickDateItems = document.querySelectorAll(".js-pill");

function handleQuickDateItemClick(event) {
  event.preventDefault();

  quickDateItems.forEach((item) => {
    item.classList.remove("bg-neutral-900", "text-white");
    item.classList.add("bg-neutral-200", "text-neutral-900");
  });

  event.target.classList.add("bg-neutral-900", "text-white");
  event.target.classList.remove("bg-neutral-200", "text-neutral-900");
}

quickDateItems.forEach((item) => {
  item.addEventListener("click", handleQuickDateItemClick);
});