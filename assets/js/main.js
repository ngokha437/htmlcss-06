import { Media } from "./media.js";

document.addEventListener("DOMContentLoaded", () => {
  Media.start();
});

// Header
const header = $("#sticky-header");

document.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Stats
const statsDots = $$(".stats__dot");
const statsItems = $$(".stats__item");

function setActive(index) {
  statsDots.forEach((dot) => dot.classList.remove("stats__dot--active"));
  statsItems.forEach((item) => item.classList.remove("stats__item--active"));

  statsDots[index].classList.add("stats__dot--active");
  statsItems[index].classList.add("stats__item--active");
}

statsDots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    if (!this.classList.contains("stats__dot--active")) {
      setActive(index);
    }
  });
});

statsItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    if (!this.classList.contains("stats__item--active")) {
      setActive(index);
    }
  });
});

// Design
const desktopList = $(".desktop-list");
let activeItem = $(".desktop-item--active");

desktopList.addEventListener("click", (e) => {
  const item = e.target.closest(".desktop-item");
  if (!item) return;

  if (activeItem) {
    activeItem.classList.remove("desktop-item--active");
  }

  item.classList.add("desktop-item--active");
  activeItem = item;
});

// Solution
const cardItems = $$(".card-item");
const mediaList = $$(".media-list");

function setActiveSolution(index) {
  cardItems.forEach((dot) => dot.classList.remove("card-item--active"));
  mediaList.forEach((item) => item.classList.remove("media-list--active"));

  cardItems[index].classList.add("card-item--active");
  mediaList[index].classList.add("media-list--active");
}

cardItems.forEach((card, index) => {
  card.addEventListener("click", function () {
    if (!this.classList.contains("card-item--active")) {
      setActiveSolution(index);
    }
  });
});

// Feedback
