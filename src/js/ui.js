/* Display tab contents on UI tab selection (MD + larger viewports) */
const strategyTabBtns = document.querySelectorAll(".js-tab-btn");

for (let tabBtn of strategyTabBtns) {
  tabBtn.addEventListener("click", (event) => {
    const selectedStrategy = tabBtn.getAttribute("aria-controls"),
          selectedTabContents = document.querySelector(`.js-tab-content-all #${selectedStrategy}`),
          otherTabContents = document.querySelectorAll(`.js-tab-content:not(#${selectedStrategy})`),
          otherTabBtns = document.querySelectorAll(`.js-tab-btn:not(#tab_${selectedStrategy})`);

    for (let tabContents of otherTabContents) {
      tabContents.classList.add("hidden");
      tabContents.setAttribute("hidden", true);
    };

    for (let unselectedTabBtn of otherTabBtns) {
      unselectedTabBtn.classList.remove("border-t-neutral-900", "text-neutral-900", "font-bold");
      unselectedTabBtn.classList.add("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
      unselectedTabBtn.setAttribute("aria-selected", "false");
      unselectedTabBtn.setAttribute("tabindex", "-1");
    };

    selectedTabContents.classList.remove("hidden");
    selectedTabContents.removeAttribute("hidden");

    tabBtn.classList.add("border-t-neutral-900", "text-neutral-900", "font-bold");
    tabBtn.classList.remove("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
    tabBtn.setAttribute("aria-selected", "true");
    tabBtn.setAttribute("tabindex", "0");

  });
};

/* Quick selects pills */
let quickDateItems = document.querySelectorAll(".js-pill");

quickDateItems.forEach(function(toggler) {
  toggler.addEventListener("click", function(e) {
    e.preventDefault();

    for (let i = 0; i < quickDateItems.length; i++) {
      quickDateItems[i].classList.remove("bg-neutral-900", "text-white");
      quickDateItems[i].classList.add("bg-neutral-200", "text-neutral-900");
    }
    e.target.classList.add("bg-neutral-900", "text-white");
    e.target.classList.remove("bg-neutral-200", "text-neutral-900");
  });
});

