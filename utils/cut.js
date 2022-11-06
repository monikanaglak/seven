

export function erassing_elements(something,thing_to_cut){
  /*console.log("something : ", something);
  console.log("thing_to_cut : ", thing_to_cut);*/
    for(let i=0;i<something.length;i++){
        if(something[i]=== thing_to_cut){
        something.splice(i,1)
        /*console.log("something : ", something);*/
        if(something.length === 0){
          something = [];
        }
      }
      
    }
}
