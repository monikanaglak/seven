
let btn_arrows = document.querySelectorAll('.moving');
btn_arrows.forEach((element)=>{
  element.addEventListener("click",function testing(e){
      element.classList.toggle("arrow_moving")
  })
  
})


const elements_dropdown = document.querySelector(".dropdown-menu");

const btn_ingredients = document.getElementById("ingredients");
btn_ingredients.addEventListener("click", (e)=>{
  btn_ingredients.classList.toggle("show");
  const inpING = document.querySelector(".looking");
  inpING.addEventListener("click",function(e){
    e.stopPropagation();
  })
  elements_dropdown.addEventListener("click", function(e){
    e.stopPropagation();
  })
});
const elements_dropdown_appareil = document.querySelector(".dropdown-menu");
//button appareil show ajouter au click menu dropdown apparail
const btn_appareil = document.getElementById("appareil");
btn_appareil.addEventListener("click", ()=>{
  btn_appareil.classList.toggle("show");
  
  let inpAPP = document.querySelector(".looking-app");
  inpAPP.addEventListener("click", function(e){
    e.stopPropagation();
  })
  elements_dropdown_appareil.addEventListener("click", function(e){
    e.stopPropagation();
  })
});



//button ustensiles au click menu dropdown apparait
const btn_ustensiles = document.getElementById("ustensiles");
btn_ustensiles.addEventListener("click", ()=>{
  btn_ustensiles.classList.toggle("show");
  btn_ustensiles.classList.add("ccc")
  const div_ustensiles = document.querySelector(".dropdown-menu");
  div_ustensiles.addEventListener("click", function(e){
    e.stopPropagation();
  })
  const inpUSE = document.querySelector(".looking-us");
  inpUSE.addEventListener("click", function(e){
    e.stopPropagation();
  })
});


    



