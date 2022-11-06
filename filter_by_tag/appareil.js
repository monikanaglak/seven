import {
  getting_data,
  queen,
  update_queen,
  all_elements,
} from "../components/fetchdata.js";
import { outputHTML } from "../app.js";

import {
  making_array_ingriedient,
  dropdown_ingredients,
  alphabet_order,
  update_ingredients,
  ingredients_box,
} from "./ingridients.js";
import {
  making_array_ustensils,
  dropdown_ustensiles,
  kitchen_ustensiles,
  update_usentiles,
  array_clicked_ustensils,
} from "./usentiles.js";
import { erassing_elements } from "../utils/cut.js";
import { recettes_actualisation } from "../utils/actualisation_recettes.js";

import { search_things, word_found } from "../components/search_input_bar.js";
export const data = await getting_data();
export let array_clicked_appareil = [];
export let update_appareil = [];
//getting all appareils from data
export function making_array_appareil(data) {
  let all_appareil = data.map((dat) => dat.appliance.toLowerCase());
  const [...bSet] = new Set(all_appareil);
  return bSet;
}
let bSet = making_array_appareil(data);
export const alphabet = bSet.sort((a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
});

const container_appareil = document.querySelector("#test");
export const lists_appareil = (alphabet) => {
  const list_appareil = alphabet
    .map((dat) => {
      return `
          <a href="#" class="dropdown-item" id="tag_app">${dat}</a>
      `;
    })
    .join("");
  container_appareil.innerHTML = list_appareil;
};
lists_appareil(alphabet);

function checking_appareil(e) {
  let appareil_clicked = e.target.innerHTML.toLowerCase();
  if (appareil_clicked) {
    if (queen.length === 0) {
      const recette_affiche = document.querySelectorAll(".recette");
      let id_recette_affiche = [];
      recette_affiche.forEach((r) => {
        id_recette_affiche.push(parseInt(r.getAttribute("id")));
      });

      data.map((dat) => {
        if (id_recette_affiche.includes(dat.id)) {
          if (dat.appliance.toLowerCase().includes(appareil_clicked)) {
            let appareil_found = dat;
            queen.push(appareil_found);

            let selected_ingredients = making_array_ingriedient(queen);
            dropdown_ingredients(selected_ingredients);

            let selected_ustensiles = making_array_ustensils(queen);
            dropdown_ustensiles(selected_ustensiles);

            let selected_app = making_array_appareil(queen);

            erassing_elements(selected_app, appareil_clicked);
            lists_appareil(selected_app);
            update_appareil.push(selected_app);
            outputHTML(queen);
          }
        }
      });
    } else {
      let temps_array_app = [];
      queen.map((dat) => {
        if (dat.appliance.includes(appareil_clicked)) {
          let appareil_found = dat;

          if (!array_clicked_appareil.includes(appareil_clicked)) {
            temps_array_app.push(appareil_found);
            let selected_ingredient = making_array_ingriedient(temps_array_app);

            let difference_ingredient = selected_ingredient.filter(
              (x) => ingredients_box.indexOf(x) === -1
            );

            if (update_ingredients.length === 0) {
              dropdown_ingredients(selected_ingredient);
            } else {
              dropdown_ingredients(difference_ingredient);
            }

            let selected_usentiles = making_array_ustensils(temps_array_app);

            let difference_ustensiles = selected_usentiles.filter(
              (x) => array_clicked_ustensils.indexOf(x) === -1
            );
            if (update_usentiles.length === 0) {
              dropdown_ustensiles(selected_usentiles);
            } else {
              dropdown_ustensiles(difference_ustensiles);
            }

            let newArrayApp = making_array_appareil(temps_array_app);

            let newArrayWithoutDupicates_app = [];
            newArrayApp.forEach((el) => {
              if (
                !array_clicked_appareil.includes(el) &&
                el !== appareil_clicked
              ) {
                newArrayWithoutDupicates_app.push(el);
              }
            });
            update_queen(temps_array_app);
            update_appareil.push(newArrayWithoutDupicates_app);
            lists_appareil([]);
            outputHTML(temps_array_app);
          }
        }
      });
    }
    array_clicked_appareil.push(appareil_clicked);
    all_elements.push(appareil_clicked);
    output_appareil_btn(appareil_clicked.toLowerCase());
  }
  function output_appareil_btn(appareil_clicked) {
    if (queen == "") return false;
    const box_for_display_elements_clicked = document.querySelector(
      ".list_ingrediens_chosen"
    );
    const element_shown = document.createElement("span");
    element_shown.classList.add("close_form_appareil");
    element_shown.classList.add("element_click_appar");
    const btn_appareil = `
        <li class="element_click">${appareil_clicked}
          <a href="#" aria-label="Close">
          <img src="./assets/close.svg"/ style="width:10px">
          </a>
        </li>
     `;
    element_shown.innerHTML = btn_appareil;
    box_for_display_elements_clicked.appendChild(element_shown);

    const all_appareils_clicked = document.getElementsByClassName(
      "close_form_appareil"
    );
    element_shown.addEventListener("click", function () {
      let inside_input = search_things.value;
      let element_closed = e.target.innerHTML;
      element_shown.innerHTML = "";
      const index = array_clicked_appareil.indexOf(element_closed);
      array_clicked_appareil.splice(index, 1);
      all_elements.splice(index, 1);
      let selected_appareils = making_array_appareil(queen);
      erassing_elements(selected_appareils, inside_input);
      lists_appareil(selected_appareils);

      if (
        all_elements.length === 0 &&
        array_clicked_appareil.length === 0 &&
        inside_input.length === 0
      ) {
        update_queen([]);
        outputHTML(data);
        dropdown_ingredients(alphabet_order);
        dropdown_ustensiles(kitchen_ustensiles);
        lists_appareil(alphabet);
      } else {
        recettes_actualisation(
          ingredients_box,
          array_clicked_appareil,
          array_clicked_ustensils,
          inside_input,
          all_elements
        );
      }
    });
  }
}
//filter appareils with input inside dropdown//
const input_searching = document.querySelector(".looking-app");
input_searching.addEventListener("input", (e) => {
  const search_appareil = e.target.value.toLowerCase();
  let recettes_from_dropdown = [];
  let appareil_found;
  if (search_appareil.length >= 3) {
    appareil_found = alphabet.filter((el) =>
      el.toLowerCase().includes(search_appareil)
    );
    data.map((dat) => {
      if (dat.appliance.toLowerCase().includes(search_appareil))
        recettes_from_dropdown.push(dat);
    });
    outputHTML(recettes_from_dropdown);
    lists_appareil(appareil_found);
    update_queen(recettes_from_dropdown);
  }
  if (search_appareil.length >= 3 && recettes_from_dropdown.length === 0) {
    const container = document.getElementById("container");
    //display on the page message erreur
    const htmlPage = `<div class="container_message_title">
        <div class="worning_message">Aucune recette correspond à vos critères...</div>
        <div class="message_text">Vous pouvez chercher "tarte aux pommes","poisson",ect </div>
        </div>
      `;
    container.innerHTML = htmlPage;
  }
  if (search_appareil.length === 0) {
    lists_appareil(alphabet);
    outputHTML(data);
  }
});

container_appareil.addEventListener("click", checking_appareil);
