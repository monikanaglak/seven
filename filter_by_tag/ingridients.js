import { outputHTML } from "../app.js";
import {
  all_elements,
  getting_data,
  queen,
  update_queen,
} from "../components/fetchdata.js";
import { erassing_elements } from "../utils/cut.js";
import { recettes_actualisation } from "../utils/actualisation_recettes.js";
import {
  lists_appareil,
  update_appareil,
  making_array_appareil,
  alphabet,
  array_clicked_appareil,
} from "./appareil.js";
import {
  making_array_ustensils,
  dropdown_ustensiles,
  update_usentiles,
  array_clicked_ustensils,
  kitchen_ustensiles,
} from "./usentiles.js";
import { search_things,word_found } from "../components/search_input_bar.js";

const data = await getting_data();
export let update_ingredients = [];
export let ingredients_box = [];
export let recettes_from_ingredient = [];

let inside_input;


//function for getting all ingredients
export function making_array_ingriedient(data) {
  let ingridients_arrays = data.map((dat) =>
    dat.ingredients.map((i) => i.ingredient.toLowerCase())
  );
  //concatinations of all arrays
  let all_ingridiens = ingridients_arrays.reduce(function (arr, e) {
    return arr.concat(e);
  });
  //cutting of the double ingredients present in all_ingridiens
  const [...bSet] = new Set(all_ingridiens);
  return bSet;
}
let bSet = making_array_ingriedient(data);

//getting elements in alphabetic order
export let alphabet_order = bSet.sort((a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
});

//selecting element from html, where ingredients will be injected
const container_ingridients = document.querySelector(".dropdown-menu");
//function inject the ingredients in dropdown menu
export let dropdown_ingredients = (alphabet_order) => {
  const ingridient = alphabet_order
    .map((dat) => {
      return `
      <a href="#" class="dropdown-item">${dat}</a>
    `;
    })
    .join("");
  container_ingridients.innerHTML = ingridient;
};
//calling function that puts all ingredients in dropdown
dropdown_ingredients(alphabet_order);


//main function that look for ingredient click in all recettes
export function looking_for_ingredient(e) {
  let ingridient_clicked = e.target.innerHTML;
  if (ingridient_clicked) {
    if (queen.length === 0) {
      const recette_affiche = document.querySelectorAll(".recette");
      let id_recette_affiche = [];
      recette_affiche.forEach((r) => {
        id_recette_affiche.push(parseInt(r.getAttribute("id")));
      });
      data.filter((dat) => {
        if (id_recette_affiche.includes(dat.id)) {
          dat.ingredients.filter((i) => {
            if (i.ingredient.toLowerCase().includes(ingridient_clicked)) {
              let ingredient_found = dat;
              queen.push(ingredient_found);
              
              let selected_appareil = making_array_appareil(queen);
              lists_appareil(selected_appareil);
            
              let selected_usentiles = making_array_ustensils(queen);
              dropdown_ustensiles(selected_usentiles);
              
              inside_input = search_things.value.toLowerCase();
              let selected_ingiredients = making_array_ingriedient(queen);

              erassing_elements(selected_ingiredients, word_found);
              erassing_elements(selected_ingiredients, ingridient_clicked);

              //injection ingredients in dropdown
              dropdown_ingredients(selected_ingiredients);
              //stock ingredients that are in dropdown in array
              update_ingredients.push(selected_ingiredients);
              //function to display recettes
              outputHTML(queen);
            }
          });
        }
      });
    } else {
      let temp_array_ing = [];
      queen.map((dat) => {
        dat.ingredients.map((i) => {
          if (i.ingredient.toLowerCase().includes(ingridient_clicked)) {
            let ingredient_found = dat;
            if (!ingredients_box.includes(ingridient_clicked)) {
              temp_array_ing.push(ingredient_found);
            }
            //dropdown of appareils
            let selected_array_app = making_array_appareil(temp_array_ing);
            if (update_appareil.length === 0) {
              lists_appareil(selected_array_app);
            } else {
              lists_appareil([]);
            }
            //getting ustensiles present in recette
            let selected_array_us = making_array_ustensils(temp_array_ing);

            let difference_us = selected_array_us.filter(
              (x) => array_clicked_ustensils.indexOf(x) === -1
            );

            if (update_usentiles.length === 0) {
              dropdown_ustensiles(selected_array_us);
            } else {
              dropdown_ustensiles(difference_us);
            }
            //getting ride of ingredients double
            let newArrayIng = making_array_ingriedient(temp_array_ing);
            let newArrayWithoutDupicates_in = [];
            newArrayIng.forEach((el) => {
              if (!ingredients_box.includes(el) && el !== ingridient_clicked) {
                newArrayWithoutDupicates_in.push(el);
              }
            });
            update_queen(temp_array_ing);
            erassing_elements(newArrayWithoutDupicates_in,word_found)
            erassing_elements(newArrayWithoutDupicates_in,ingridient_clicked)
            dropdown_ingredients(newArrayWithoutDupicates_in);
            update_ingredients.push(newArrayWithoutDupicates_in);
            outputHTML(temp_array_ing);
          }
        });
      });
    }
    //pushing in array ingredients_box ingredient that was clicked
    ingredients_box.push(ingridient_clicked);
    all_elements.push(ingridient_clicked);
    output_ingridient_btn(ingridient_clicked);
  }

  //function that put what was clicked in dropdown
  function output_ingridient_btn(ingridient_clicked) {
    if (queen == "") return false;
    const box_for_display_elements_clicked = document.querySelector(
      ".list_ingrediens_chosen"
    );
    const element_shown = document.createElement("span");
    element_shown.classList.add("close_element");
    element_shown.classList.add("element_click_ingridient");
    const btn_ingridient = `
        <li class="element_click">${ingridient_clicked}
          <a href="#" aria-label="Close">
          <img src="./assets/close.svg"/ style="width:10px">
          </a>
        </li>
     `;
    element_shown.innerHTML = btn_ingridient;
    box_for_display_elements_clicked.appendChild(element_shown);

    //giving all elements from dropdown possibilite to click
    const all_elements_clicked =
      document.getElementsByClassName("close_element");
    //function disapeare what was closed, and update arrays of clicked elements
    element_shown.addEventListener("click", function () {
      let inside_input = search_things.value.toLowerCase();
      let element_closed = e.target.innerHTML;
      element_shown.innerHTML = "";
      const index = ingredients_box.indexOf(element_closed);
      ingredients_box.splice(index, 1);
      all_elements.splice(index, 1);
      
      
      let selected_ingiredients = making_array_ingriedient(queen);
      
      erassing_elements(selected_ingiredients, inside_input);
      dropdown_ingredients(selected_ingiredients);
      
      //if nothing in the input search, nothing display below dropdown
      if (
        ingredients_box.length === 0 &&
        all_elements.length === 0 &&
        inside_input.length === 0
      ) {
        update_queen([])
        outputHTML(data);
        dropdown_ingredients(alphabet_order);
        lists_appareil(alphabet);
        dropdown_ustensiles(kitchen_ustensiles);
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
//function searching of by input in dropdown
const input_searching = document.querySelector(".looking");
input_searching.addEventListener("input", (e) => {
  const search_ingridient = e.target.value.toLowerCase();
  let recettes_from_dropdown = [];
  let ingrids_found;
  if (search_ingridient.length >= 3) {
    //filtring all ingredients that have the letters includes
    ingrids_found = alphabet_order.filter((el) =>
      el.toLowerCase().includes(search_ingridient)
    );
    data.filter((dat) => {
      dat.ingredients.filter((i) => {
        if (i.ingredient.toLowerCase().includes(search_ingridient)) {
          recettes_from_dropdown.push(dat);
        }
      });
    });
    outputHTML(recettes_from_dropdown);
    dropdown_ingredients(ingrids_found);
    update_queen(recettes_from_dropdown);
  }
  if (search_ingridient.length >= 3 && recettes_from_dropdown.length === 0) {
    const container = document.getElementById("container");
    //display on the page message erreur
    const htmlPage = `<div class="container_message_title">
    <div class="worning_message">Aucune recette correspond à vos critères...</div>
    <div class="message_text">Vous pouvez chercher "tarte aux pommes","poisson",ect </div>
    </div>
  `;
    container.innerHTML = htmlPage;
  }
  if (search_ingridient.length === 0) {
    dropdown_ingredients(alphabet_order);
    outputHTML(data);
  }
});

container_ingridients.addEventListener("click", looking_for_ingredient);
