//searching for ingredient or recette by name, by appareil by description( by input in search bar principale)

import { all_elements, getting_data, update_queen } from "./fetchdata.js";
import { outputHTML } from "../app.js";
import {making_array_ustensils,dropdown_ustensiles, array_clicked_ustensils, kitchen_ustensiles
} from "../filter_by_tag/usentiles.js";
import { making_array_appareil,lists_appareil, array_clicked_appareil, alphabet } from "../filter_by_tag/appareil.js";
import { making_array_ingriedient,dropdown_ingredients,ingredients_box, alphabet_order } from "../filter_by_tag/ingridients.js";
import { erassing_elements } from "../utils/cut.js";
import { recettes_actualisation } from "../utils/actualisation_recettes.js";
const data = await getting_data();
export let recettes_found_old = [];
export let word_found;
export let search_things = document.getElementById("search");

export function searching_with_input(e) {
  let inside_input = search_things.value.toLowerCase();
  const recette_affiche_search = document.querySelectorAll(".recette");
  let id_recette_affiche_search = [];
  //if input is empty, and nothing is display as buttons below dropdowns
  if (inside_input.length === 0 && all_elements.length === 0){
    update_queen([])
    outputHTML(data)
    dropdown_ingredients(alphabet_order)
    lists_appareil(alphabet)
    dropdown_ustensiles(kitchen_ustensiles)
  }
  //if input is empty but there is still something display
  if(inside_input.length === 0 && all_elements.length>0){
    recettes_actualisation(ingredients_box,array_clicked_appareil,array_clicked_ustensils,inside_input,all_elements)
  }
  if (inside_input.length >= 3) {
    let all_found = [];
    all_found.push(inside_input);
    let word = all_found.pop();
    word_found = word.trim();
    let recettes_old_version = [];
    recette_affiche_search.forEach((r) => {
      id_recette_affiche_search.push(parseInt(r.getAttribute("id")));
    });

    for (let i = 0; i < data.length; i++) {
      if(id_recette_affiche_search.includes(data[i].id)){
      if (data[i].name.includes(word_found)) {
        recettes_old_version.push(data[i]);
  
      }
      if (data[i].description.includes(word_found)) {
        recettes_old_version.push(data[i]);
      }

      let ingredients_all = data[i].ingredients;
      for (let j = 0; j < ingredients_all.length; j++) {
        let ingredient_all = ingredients_all[j];

        if (ingredients_all[j].ingredient.toLowerCase().includes(word_found)) {
          recettes_old_version.push(data[i]);
        }
      }
      if (data[i].appliance.includes(word_found)) {
        recettes_old_version.push(data[i]);
      }

      let all_ustensils = data[i].ustensils;
      for (let j = 0; j < all_ustensils; j++) {
        if (all_ustensils[j].includes(word_found)) {
          recettes_old_version.push(data[i]);
        }
      }
    }
  }
    //if there is no recette found, message will be shown
    if (recettes_old_version.length === 0) {
      const container = document.getElementById("container");
      const htmlPage = `<div class="container_message_title">
      <div class="worning_message">Aucune recette correspond à vos critères...</div>
      <div class="message_text">Vous pouvez chercher "tarte aux pommes","poisson",ect </div>
      </div>
    `;
      container.innerHTML = htmlPage;
      //if there is  a match
    } else{
      //getting ride of the recettes double
      recettes_found_old = [...new Set(recettes_old_version)];
      
      let ingred = making_array_ingriedient(recettes_found_old);
      erassing_elements(ingred, word_found);
     

      let appareil = making_array_appareil(recettes_found_old);
      erassing_elements(appareil, word_found);

      let ustensiles = making_array_ustensils(recettes_found_old);
      erassing_elements(ustensiles, word_found);
      
      outputHTML(recettes_found_old);
      dropdown_ingredients(ingred);
      lists_appareil(appareil);
      dropdown_ustensiles(ustensiles);
    } 
  }
}
search_things.addEventListener("input", searching_with_input);
