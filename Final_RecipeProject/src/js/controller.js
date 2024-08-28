 import * as model from './model.js';
 import recipeView from '../view/recipeview.js';
 import searchview from '../view/searchview.js';
 import ResultsView from '../view/resultsview.js';
 import Pagination from '../view/pagination.js';
 import 'core-js/stable';
 import 'regenerator-runtime/runtime';
import recipeServingView from '../view/recipeServingView.js';
import bookMark from '../view/bookMark.js';
import addRecipe from '../view/addRecipe.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if(module.hot){
  module.hot.accept();
}


 async function controller(){
  
  try{
    let id=window.location.hash.slice(1);
    console.log(id);
    if(!id) return ;

    
   recipeView.renderSpinner();

   await model.fetchRecipe(id);
   
    
    
    recipeView.render(model.state.recipe);
    ResultsView.updateData(model.state.search.allResult);
    recipeServingView.addHandlerServing(servingsChangeHandler);
    bookMark.addHandlerBookMark(bookMarksChangeHandler);
    // recipeView.addHandlerServing(servingsChangeHandler);

  //  let query =searchview.getQuery();
   
  //  if(!query) return;
  
  //  await model.fetchAllrecipe(query);
  
   }

  catch(err){
          recipeView.renderErrorMessage();
  }
 };

 async function searchController(){
  
  try{
   
   
   let query =searchview.getQuery();
   
   
   if(!query) return;
    ResultsView.renderSpinner();
  
   await model.fetchAllrecipe(query);
  
  //  ResultsView.render(state.search.allResult);
  ResultsView.render(model.state.search.allResult);
  Pagination.render();
  //ResultsView.addActive();
  
   }

  catch(err){
         ResultsView.renderErrorMessage();
  }
 };
 //controller();

  const PageChangeHandler=()=>{
    ResultsView.render(model.state.search.allResult);
  // Pagination.render();
  }

  function bookMarksChangeHandler(){
    bookMark.handleBookMark();
    recipeView.updateData(model.state.recipe);
  }

  function servingsChangeHandler(val){
    if(val>0){
      model.state.servings++;
    }
    else if(model.state.servings>1) model.state.servings--;
    else return ;

    //recipeView.updateServings(model.state.servings);
   // recipeView.render(model.state.recipe);
    recipeView.updateData(model.state.recipe);
     //recipeView.addHandlerServing(servingsChangeHandler);
   // recipeServingView.addHandlerServing(servingsChangeHandler);
   
  }

  function localStorage(arr){
    model.state.bookMarks=arr//.filter((val)=>Object.keys(val).length>0);
     bookMark.render(model.state.bookMarks);
    recipeView.updateData(model.state.recipe);
  }

  async function addRecipeControl(data){
    try{
    console.log(data);
      await model.uploadRecipe(data);
     addRecipe.closeWindow();
      bookMark.handleBookMark();
     //
     console.log('id',model.state.recipe.id);
     window.history='';
     window.history.pushState(null,'',`#${model.state.recipe.id}`);
     recipeView.render(model.state.recipe);
   //  controller();
     
     bookMark.addHandlerBookMark(bookMarksChangeHandler);

     
    }
    catch(err){
      recipeView.renderErrorMessage();
    }
  }


 (function init(){
  // ["hashchange",'load'].forEach(val=>window.addEventListener(val,()=>controller()));
    recipeView.renderEvents(controller);
    searchview.addHandlerSearch(searchController);
   Pagination.addHandlerPage(PageChangeHandler);
   bookMark.renderEvents(localStorage);
   addRecipe.addHandler();
   addRecipe.addHandlerUpload(addRecipeControl)
  //  recipeServingView.addHandlerServing(servingsChangeHandler);
 })();


 
