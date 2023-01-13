function tabs() {
  const tabheaderItems = document.querySelectorAll(".tabheader__item");
  const tabContents = document.querySelectorAll(".tabcontent");

  tabheaderItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      tabContents.forEach((element) => {
        element.classList.remove("tabcontent__visible");
      });
      tabheaderItems.forEach((item) => {
        item.classList.remove("tabheader__item_active");
      });
      tabContents[i].classList.add("tabcontent__visible");
      item.classList.add("tabheader__item_active");
    });
  });
}

export default tabs;
