/* Tabbed navigation for strategies (MD + larger viewports) */
let tabs = document.querySelector(".js-tabs"),
    tabItems = tabs.querySelectorAll(".js-tab-item button");

tabItems.forEach(function(toggler) {
  toggler.addEventListener("click", function(e) {
    e.preventDefault();

    let tabID = this.getAttribute("aria-controls"),
        tabContent = document.querySelector(".js-tab-content-all");

    for (let i = 0; i < tabContent.children.length; i++) {

      // Tabs’ appearance when NOT selected
      tabItems[i].classList.remove("border-neutral-900", "text-neutral-900", "font-bold");
      tabItems[i].classList.add("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
      tabItems[i].setAttribute("aria-selected", "false");
      tabItems[i].setAttribute("tabindex", "-1");

      // Tab not selected, thus hide its content
      tabContent.children[i].classList.remove("hidden");
      tabContent.children[i].removeAttribute("hidden");

      if (tabContent.children[i].id === tabID) {
        continue;
      }
      tabContent.children[i].classList.add("hidden");
      tabContent.children[i].setAttribute("hidden", "");
    }

    // Tab’s appearance when selected
    e.target.classList.add("border-neutral-900", "text-neutral-900", "font-bold");
    e.target.classList.remove("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
    e.target.setAttribute("aria-selected", "true");
    e.target.setAttribute("tabindex", "0");
  });
});

/* Select menu navigation for strategies (XS + SM viewports) */
let strategySelect = document.querySelector(".js-strategy-select"),
    canArchiveVORContent = document.querySelector("#can-archive-vor"),
    canArchiveAAMContent = document.querySelector("#can-archive-aam");

strategySelect.addEventListener("change", function(e) {
  if (e.target.value === "canArchiveVOR") {
      canArchiveVORContent.classList.remove("hidden");
      canArchiveAAMContent.classList.add("hidden");
  } else if (e.target.value === "canArchiveAAM") {
      canArchiveAAMContent.classList.remove("hidden");
      canArchiveVORContent.classList.add("hidden");
  };
});

/* Quick selects pills */
let quickDateItems = document.querySelectorAll(".js-pill");

quickDateItems.forEach(function(toggler) {
  toggler.addEventListener("click", function(e) {
    e.preventDefault();

    for (let i = 0; i < quickDateItems.length; i++) {
      quickDateItems[i].classList.remove("bg-neutral-900");
      quickDateItems[i].classList.add("bg-neutral-200", "text-neutral-900");
    }
    e.target.classList.add("bg-neutral-900");
    e.target.classList.remove("bg-neutral-200", "text-neutral-900");
  });
});
