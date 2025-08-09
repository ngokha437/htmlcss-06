import { Media } from "./media.js";

const header = $("#sticky-header");

document.addEventListener("scroll", (event) => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  Media.start();
});
