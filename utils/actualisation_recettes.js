
import { all_elements, getting_data } from "../components/fetchdata.js";
import { outputHTML } from "../app.js";
const data = await getting_data();
import {
  dropdown_ingredients,
  ingredients_box,
  making_array_ingriedient,
} from "../filter_by_tag/ingridients.js";
import {
  array_clicked_appareil,
  making_array_appareil,
  lists_appareil,
} from "../filter_by_tag/appareil.js";
import {
  array_clicked_ustensils,
  making_array_ustensils,
  dropdown_ustensiles,
} from "../filter_by_tag/usentiles.js";

import { search_things } from "../components/search_input_bar.js";
import { erassing_elements } from "./cut.js";

let inside_input = search_things.value;
let new_recettes = [];
//function for actualisation of the recettes after closing un tag display or cleaning input
export function recettes_actualisation(
  ingredients_box,
  array_clicked_appareil,
  array_clicked_ustensils,
  inside_input,
  all_elements
) {
  if (inside_input.length > 0) {
    let kiki = inside_input.trim();
    data.filter((dat) => {
      dat.ingredients.filter((i) => {
        if (i.ingredient.toLowerCase().includes(kiki)) {
          new_recettes.push(dat);
          let ingredient_in = making_array_ingriedient(new_recettes)
          erassing_elements(ingredient_in,kiki)
          dropdown_ingredients(ingredient_in)
        }
      });
    });
    data.map((dat) => {
      if (dat.name.toLowerCase().includes(kiki)) {
        new_recettes.push(dat);
      }
    });
    data.filter((dat) => {
      if (dat.description.toLowerCase().includes(kiki)) {
        new_recettes.push(dat);
      }
    });
  }

  if (ingredients_box.length > 0) {
    console.log("ingredients box :", ingredients_box);
    for (let i = 0; i < ingredients_box.length; i++) {
      refiltring_by_ingredient(ingredients_box[i]);
    }

    function refiltring_by_ingredient(element) {
      data.filter((dat) => {
        dat.ingredients.filter((i) => {
          if (i.ingredient.toLowerCase().includes(element)) {
            new_recettes.push(dat);
            let ingred = making_array_ingriedient(new_recettes);
            erassing_elements(ingred, element);
            dropdown_ingredients(ingred);
          }
        });
      });
    }
  }
  if (array_clicked_appareil.length > 0) {
    for (let i = 0; i < array_clicked_appareil.length; i++) {
      refiltering_by_appareil(array_clicked_appareil[i]);
    }

    function refiltering_by_appareil(element) {
      data.map((dat) => {
        if (dat.appliance.toLowerCase().includes(element)) {
          new_recettes.push(dat);
          let appareil = making_array_appareil(new_recettes);
          erassing_elements(appareil, element);
          lists_appareil(appareil);
        }
      });
    }
  }
  if (array_clicked_ustensils.length > 0) {
    for (let i = 0; i < array_clicked_ustensils.length; i++) {
      refiltring_by_ustensiles(array_clicked_ustensils[i]);
    }

    function refiltring_by_ustensiles(element) {
      data.map((dat) =>
        dat.ustensils.map((item) => {
          if (item.includes(element)) {
            new_recettes.push(dat);
            let ustensiles = making_array_ustensils(new_recettes);
            erassing_elements(ustensiles, element);
            dropdown_ustensiles(ustensiles);
          }
        })
      );
    }
  }
  if (new_recettes.length > 0) {
    const toFindDuplicates = (new_recettes) =>
      new_recettes.filter(
        (item, index) => new_recettes.indexOf(item) !== index
      );
    const duplicateElementa = toFindDuplicates(new_recettes);
    let one = [...new Set(duplicateElementa)];
    console.log("one", one);
    let two = [...new Set(new_recettes)];
    console.log("two", two);
    if (inside_input.length > 0 && all_elements.length > 0) {
      console.log("input is full and something is clicked");
      outputHTML(one);
    }
    if (inside_input.length == 0 && all_elements.length > 1) {
      console.log("input is empty and something is clicked");
      outputHTML(two);
    }
    if (all_elements.length == 1 && inside_input.length === 0) {
      console.log("input is empty and something is clicked but only one thing");
      outputHTML(two);
    }
    if (all_elements.length == 0 && inside_input.length > 0) {
      console.log("input is full and nothing is clicked");
      outputHTML(two);
    }
  }
}
