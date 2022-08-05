/* Tabbed navigation */
let tabs = document.querySelector(".js-tabs"),
    tabItems = tabs.querySelectorAll(".js-tab-item a");

tabItems.forEach(function(toggler) {
  toggler.addEventListener("click", function(e) {
    e.preventDefault();

    let tabID = this.getAttribute("href");

    let tabContent = document.querySelector(".js-tab-content");

    for (let i = 0; i < tabContent.children.length; i++) {

      tabItems[i].classList.remove("border-carnation-500", "text-carnation-600");
      tabItems[i].classList.add("hover:text-neutral-700", "hover:border-neutral-200");

      tabContent.children[i].classList.remove("hidden");

      if ("#" + tabContent.children[i].id === tabID) {
        continue;
      }
      tabContent.children[i].classList.add("hidden");

    }
    e.target.classList.add("border-carnation-500", "text-carnation-600");
    e.target.classList.remove("hover:text-neutral-700", "hover:border-neutral-200");
  });
});
