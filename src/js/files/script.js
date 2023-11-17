// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

const servicesBody = document.querySelector(".services__body");
const btnServicesMore = document.querySelector("#services-more");
if (btnServicesMore) {
  let servicesList = document.querySelector(".services__list");
  btnServicesMore.addEventListener("click", (e) => {
    servicesBody.classList.toggle("services__show");
    servicesList.classList.toggle("services__list_hidden");
  })
}





