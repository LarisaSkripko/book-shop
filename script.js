const items = [
    {
      title: "К себе нежно",
      description: "Ольга Примаченко, 2022",
      tags: ["Лидер продаж"],
      price: 22.82,
      img: "./img/1.jpeg",
      rating: 3.96,
    },
    {
      title: "Спеши любить",
      description: "Николас Спаркс, 2023",
      tags: ["Лидер продаж"],
      price: 11.58,
      img: "./img/2.jpeg",
      rating: 3.1,
    },
    {
      title: "Убийства по алфавиту",
      description: "Агата Кристи, 2019",
      tags: ["Лидер продаж"],
      price: 11.81,
      img: "./img/3.jpeg",
      rating: 4.94,
    },
    {
      title: "Внутренняя опора",
      description: "Анна Бабич, 2023",
      tags: ["Лидер продаж"],
      price: 20.97,
      img: "./img/4.jpeg",
      rating: 5,
    },
    {
      title: "Цветы для Элджернона",
      description: "Даниел Киз, 2021",
      tags: ["Лидер продаж"],
      price: 16.87,
      img: "./img/5.jpeg",
      rating: 4.94,
    },
    {
      title: "Хроники Нарнии",
      description: "Клайв Стейплз Льюис, 2017",
      tags: ["Лидер продаж"],
      price: 28.38,
      img: "./img/6.jpeg",
      rating: 4.69,
    },
    {
      title: "Морфий",
      description: "Михаил Булгаков, 2016",
      tags: ["Лидер продаж"],
      price: 8.83,
      img: "./img/7.jpeg",
      rating: 4.75,
    },
    {
      title: "Бог всегда путешествует инкогнито",
      description: "Лоран Гунель, 2021",
      tags: ["Лидер продаж"],
      price: 9.57,
      img: "./img/8.jpeg",
      rating: 4,
    },
    {
      title: "451° по Фаренгейту",
      description: "Рэй Брэдбери, 2022",
      tags: ["Лидер продаж"],
      price: 11.51,
      img: "./img/9.jpeg",
      rating: 5,
    },
    {
      title: "Гончие Лилит",
      description: "Кристина Старк, 2018",
      tags: ["Лидер продаж"],
      price: 23.32,
      img: "./img/10.jpeg",
      rating: 4.13,
    },
    {
      title: "Странник по звездам",
      description: "Джек Лондон, 2021",
      tags: ["Лидер продаж"],
      price: 9.95,
      img: "./img/11.jpeg",
      rating: 5,
    },
    {
      title: "Думай и богатей",
      description: "Наполеон Хилл, 2022",
      tags: ["Лидер продаж"],
      price: 12.38,
      img: "./img/12.jpeg",
      rating: 4.62,
    },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
  
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
  
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}P`;

  const ratingContainer = item.querySelector(".rating");

  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");

  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();

  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
  currentState.sort((a, b) => sortByAlphabet(a, b));
  renderItems(currentState);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  renderItems(currentState);
});
