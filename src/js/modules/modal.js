function openModalWindow() {
  const modalWindow = document.querySelector(".modal");
  modalWindow.style.display = "block";
}

function closeModalWindow() {
  const modalWindow = document.querySelector(".modal");
  modalWindow.style.display = "none";
}

function modal() {
  const openModalTimeout = 30000;
  const openModalBtns = document.querySelectorAll("[data-modal_open]");
  const modalWindow = document.querySelector(".modal");
  const modalTimeout = setTimeout(openModalWindow, openModalTimeout);

  openModalBtns.forEach((item) => {
    item.addEventListener("click", () => {
      openModalWindow();
      clearTimeout(modalTimeout);
    });
  });

  modalWindow.addEventListener("click", (e) => {
    if (e.target.getAttribute("data-close") == "") {
      closeModalWindow();
      document.removeEventListener("scroll", scrollListner);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code == "Escape") {
      closeModalWindow();
      document.removeEventListener("scroll", scrollListner);
    }
  });

  const scrollListner = function() {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    if (clientHeight + scrollTop == scrollHeight) {
      openModalWindow();
      clearTimeout(modalTimeout);
    }
  };

  document.addEventListener('scroll', scrollListner);
}

export default modal;
export { closeModalWindow };
export { openModalWindow };
