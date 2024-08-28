   import { API_URL, SERVINGS } from "./config";
   import { dataJson, sendJson } from "./helper";
   import { RANGE } from "./config";
   import { SERVINGS } from "./config";
   import {KEY} from "./config"
 let state={
    recipe:{},
    search:{
        query:'',
        result:{},
        allResult:[]
    },
    range:RANGE,
    servings:SERVINGS,
    bookMarks:[],
    currrecipe:{}
   
}

 function createRecipeobj(data){
  let {recipe}=data.data;
 
      return{
        id:recipe.id,
       time:recipe.cooking_time,
       image:recipe.image_url,
       ingredients:recipe.ingredients,
       publisher:recipe.publisher,
       servings:recipe.servings,
       source:recipe.source_url,
       title:recipe.title,
       ...(recipe.key&&{key:recipe.key}),
     }

}
   

const fetchRecipe=async(id)=>{
    try{
      //  let res=await fetch(`${API_URL}/${id}`);

        
//     let data=await res.json();
// //    console.log(res);
//  //   console.log(data);
 
    
//     if(!res.ok) throw new Error(`${data.message}`)
    let data= await dataJson(`${API_URL}/${id}`);
    console.log('hi',data);
     //console.log(res.ok);
     // now making our own obj from data so that it is convenient to use it here
    state.recipe=createRecipeobj(data);
    
     
    }
    catch(err){
        throw new Error(`${err.message}`);
    }
    
 
}

let fetchAllrecipe= async (query)=>{
    try{
    let data=await dataJson(`${API_URL}?search=${query}`);
    if(!data) throw new Error(`data not found`);
    console.log(data);

    let {recipes}=data.data;
    console.log(recipes);

    if(recipes.length==0) throw new Error(`data not found`);
    state.search.allResult=recipes;
    state.range=RANGE;
    console.log('checking',state.search.allResult);
    state.search.result={
        time:recipes.cooking_time,
       image:recipes.image_url,
       ingredients:recipes.ingredients,
       publisher:recipes.publisher,
       ...(recipes.key&&{key:recipes.key})
    }
  }
  catch(err){
    throw new Error(`${err.message}`);
  }


}
async function uploadRecipe(data){
  try{
  const ingredients=Object.entries(data)
  .filter((val)=>val[0].startsWith('ingredient')&&val[1]!=='')
  .map((val)=>{
    const arr=val[1].replaceAll(' ','').split(',');
    if(arr.length!==3) throw new Error('please enter the valid format');

    let [quantity,unit,description,]=arr;
    return {
      quantity:quantity?+quantity:null,
      unit:unit,
      description:description
    }
  })
  console.log('ing',ingredients);

  let recipe={
    title:data.title,
    source_url:data.sourceUrl,
    image_url:data.image,
    publisher:data.publisher,
    cooking_time:+data.cookingTime,
    servings:+data.servings,
    ingredients

  }

  let newdata= await sendJson(`${API_URL}?key=${KEY}`,recipe);
  state.recipe=createRecipeobj(newdata);
}
 catch(err){
  throw new Error(err.message);
 }
}
//fetchAllrecipe();


export {state,fetchRecipe,fetchAllrecipe,uploadRecipe};