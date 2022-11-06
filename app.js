import { getting_data } from "./components/fetchdata.js";
export const data = await getting_data();
const alphabet = data.sort((a, b) => {
  let fa = a.name.toLowerCase(),
    fb = b.name.toLowerCase();
  if (fa < fb) {
    return -1;
  }
  if (fa > fb) {
    return 1;
  }
  return 0;
});

//selecting container where recette will be implemented
const container = document.getElementById("container");
//function to display recettes into DOM
export const outputHTML = (data) => {
  container.innerHTML = " ";
  const html = data
    .map(
      (dat) => `
          <article class="recette" id=${dat.id}>
            <div class="card-header"></div>
            <div class="recette_description">
              <div class="recette_header">
                <h4 class="recette_title">${dat.name}</h4>
                <div class="recette_info">
                  <span class="far fa-clock mt-1" style="font-size:1rem"></span>
                  <span class="recette_time">${dat.time}min</span>
                </div>
              </div>
              <div class="recette_explication">
                <div class="recette_ingridiens">${dat.ingredients
                  .map(
                    (i) =>
                      `<p class="recette_ingrid_name">${i.ingredient}:
                          <span class="ligth">${
                            i.quantity
                          }</span><span class="light x">${(i.unit
                        ? i.unit
                        : " "
                      ).slice(0, 2)}</span></p>
                          `
                  )
                  .join("")}
                </div>
                <p class="recette_how">${dat.description}</p>
              </div>
            </div>
          </article>
        `
    )
    .join("");
  container.innerHTML = html;
};
outputHTML(alphabet);
