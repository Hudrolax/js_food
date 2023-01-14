const MENU_ROUTE = "http://185.189.151.253:3000/menu";

function cards() {
  class MenuItem {
    constructor(item, parentSelector) {
      this.img = item.img;
      this.altimg = item.altimg;
      this.title = item.title;
      this.descr = item.descr;
      this.price = item.price;
      this.parent = document.querySelector(parentSelector);
      this.html = this.constructHTML();
    }

    constructHTML() {
      return `<div class="menu__item">
                <img src="${this.img}" alt="${this.altimg}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
              </div>`;
    }

    render() {
      if (this.parent) {
        this.parent.innerHTML += this.html;
      }
    }
  }

  const menuSelector = ".menu__field .container";

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  // getResource(MENU_ROUTE)
  //   .then((res) => console.log(res))
  //   .catch((reason) => console.log(reason));

  axios.get(MENU_ROUTE).then((data) =>
    data.data.forEach((item) => {
      new MenuItem(item, menuSelector).render();
    })
  );
}

export default cards;
