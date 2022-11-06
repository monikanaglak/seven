import {
  getting_data,
  queen,
  update_queen,
  all_elements,
} from "../components/fetchdata.js";
import { outputHTML } from "../app.js";
import {
  making_array_appareil,
  lists_appareil,
  update_appareil,
  alphabet,
  array_clicked_appareil,
} from "./appareil.js";
import {
  making_array_ingriedient,
  update_ingredients,
  dropdown_ingredients,
  alphabet_order,
  ingredients_box,
} from "./ingridients.js";
import { erassing_elements } from "../utils/cut.js";
import { recettes_actualisation } from "../utils/actualisation_recettes.js";
import { search_things } from "../components/search_input_bar.js";


const data = await getting_data();
export let update_usentiles = [];
export let array_clicked_ustensils = [];
export let update_usentiles_last = [];
let inside_input;
//maping all ustensiles,cutting off the doubles
export function making_array_ustensils(data) {
  let ustensils_arrays = data
    .map((dat) => dat.ustensils)
    .reduce(function (arr, e) {
      return arr.concat(e);
    });
  let [...bSet] = new Set(ustensils_arrays);
  return bSet;
}

const bSet = making_array_ustensils(data);
export const kitchen_ustens = bSet.sort((a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
});

export const kitchen_ustensiles = kitchen_ustens.map((el) => el.toLowerCase());

const container_ustensiles = document.querySelector("#testdwa");
//putting all ustensiles in the dom
export const dropdown_ustensiles = (kitchen_ustensiles) => {
  const ustensiles = kitchen_ustensiles
    .map((dat) => {
      return `
     <a href="#" class="dropdown-item">${dat}</a>
   `;
    })
    .join("");
  container_ustensiles.innerHTML = ustensiles;
};
dropdown_ustensiles(kitchen_ustensiles);
//principale function for filtring the recettes with ustensiles products
function checking_ustensiles(e) {
  let ustensiles_clicked = e.target.innerHTML;
  if (ustensiles_clicked) {
    if (queen.length === 0) {
      const recette_affiche = document.querySelectorAll(".recette");
      let id_recette_affiche = [];
      recette_affiche.forEach((r) => {
        id_recette_affiche.push(parseInt(r.getAttribute("id")));
      });
      
      data.map((dat) =>
        dat.ustensils.map((item) => {
          if (id_recette_affiche.includes(dat.id)) {
            if (item.toLowerCase().includes(ustensiles_clicked)) {
              let usentiles_found = dat;
              queen.push(usentiles_found);

              let selected_appareils = making_array_appareil(queen);
              lists_appareil(selected_appareils);

              let selected_ingredients = making_array_ingriedient(queen);
              dropdown_ingredients(selected_ingredients);

              let selected_ustensiles = making_array_ustensils(queen);
              inside_input = search_things.value.toLowerCase();
              erassing_elements(selected_ustensiles, ustensiles_clicked);

              dropdown_ustensiles(selected_ustensiles);
              update_usentiles.push(selected_ustensiles);
              outputHTML(queen);
            }
          }
        })
      );
    } else {
      let temps_array_us = [];
      queen.map((dat) =>
        dat.ustensils.map((item) => {
          if (item.includes(ustensiles_clicked)) {
            let usentiles_found = dat;
            if (!array_clicked_ustensils.includes(ustensiles_clicked)) {
              temps_array_us.push(usentiles_found);
            }

            let selected_ingredient = making_array_ingriedient(temps_array_us);

            let difference_ing = selected_ingredient.filter(
              (x) => ingredients_box.indexOf(x) === -1
            );

            if (update_ingredients.length === 0) {
              dropdown_ingredients(selected_ingredient);
            } else {
              dropdown_ingredients(difference_ing);
            }

            let selected_appareils = making_array_appareil(temps_array_us);

            if (update_appareil.length === 0) {
              lists_appareil(selected_appareils);
            } else {
              lists_appareil([]);
            }
            let newArrayUs = making_array_ustensils(temps_array_us);

            let newArrayWithoutDupicates_us = [];
            newArrayUs.forEach((el) => {
              if (
                !array_clicked_ustensils.includes(el) &&
                el !== ustensiles_clicked
              ) {
                newArrayWithoutDupicates_us.push(el);
              }
            });
            update_queen(temps_array_us);
            erassing_elements(newArrayWithoutDupicates_us,inside_input)
            erassing_elements(newArrayWithoutDupicates_us,ustensiles_clicked)
            dropdown_ustensiles(newArrayWithoutDupicates_us);
            update_usentiles.push(newArrayWithoutDupicates_us);
            outputHTML(temps_array_us);
          }
        })
      );
    }
    array_clicked_ustensils.push(ustensiles_clicked);
    all_elements.push(ustensiles_clicked);
    output_ustensiles_btn(ustensiles_clicked);
  }
  //function that inject in DOM what was clicked in button
  function output_ustensiles_btn(ustensiles_clicked) {
    if (queen == "") return false;
    const box_for_display_elements_clicked = document.querySelector(
      ".list_ingrediens_chosen"
    );
    const element_shown = document.createElement("span");
    element_shown.classList.add("close_form_usentiles");
    element_shown.classList.add("element_click_ustensiles");

    const btn_ustensiles = `
      <li class="element_click">${ustensiles_clicked}
        <a href="#" aria-label="Close">
        <img src="./assets/close.svg"/ style="width:10px">
        </a>
      </li>
   `;
    element_shown.innerHTML = btn_ustensiles;
    box_for_display_elements_clicked.appendChild(element_shown);

    const closing_ingrid = document.getElementsByClassName(
      "close_form_usentiles"
    );

    element_shown.addEventListener("click", function () {
      let element_closed = e.target.innerHTML;
      let inside_input = search_things.value;
      element_shown.innerHTML = "";
      const index = array_clicked_ustensils.indexOf(element_closed);
      array_clicked_ustensils.splice(index,1);
      all_elements.splice(index,1);
      let selected_ustensiles = making_array_ustensils(queen);
      erassing_elements(selected_ustensiles,inside_input)
      dropdown_ustensiles(selected_ustensiles)
      if (
        array_clicked_ustensils.length === 0 &&
        all_elements.length === 0 && inside_input.length === 0
      ) {
        update_queen([])
        outputHTML(data);
        dropdown_ingredients(alphabet_order);
        lists_appareil(alphabet);
        dropdown_ustensiles(kitchen_ustensiles);
        }else {
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

  //what was written in input ingredients search bar
  const input_searching = document.querySelector(".looking-us");
  input_searching.addEventListener("input", (e) => {
    const search_ustensiles = e.target.value;
    let recettes_from_dropdown = [];
    if (search_ustensiles.length >= 3) {
      const ustensiles_found = kitchen_ustensiles.filter((el) =>
        el.includes(search_ustensiles)
      );
      data.map((dat) =>
        dat.ustensils.map((item) => {
          if (item.includes(search_ustensiles)) recettes_from_dropdown.push(dat);
        })
      );
      outputHTML(recettes_from_dropdown);
      dropdown_ustensiles(ustensiles_found);
      update_queen(recettes_from_dropdown);
    }
    if (search_ustensiles.length >= 3 && recettes_from_dropdown.length === 0) {
      const container = document.getElementById("container");
      //display on the page message erreur
      const htmlPage = `<div class="container_message_title">
      <div class="worning_message">Aucune recette correspond à vos critères...</div>
      <div class="message_text">Vous pouvez chercher "tarte aux pommes","poisson",ect </div>
      </div>
      `;
      container.innerHTML = htmlPage;
    }
    if (search_ustensiles.length === 0) {
      dropdown_ustensiles(kitchen_ustensiles);
      outputHTML(data);
    }
  });
}
container_ustensiles.addEventListener("click", checking_ustensiles);
