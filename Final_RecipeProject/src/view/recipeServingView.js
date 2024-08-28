import View from "./View";
import RecipeView from "./recipeview";
class recipeServingView extends View {
     _parentElement;

     addHandlerServing(func){
      //if(!this._parentElement)
       let element=document.querySelector('.recipe__info-buttons');
       // console.log(this._parentElement);
       console.log(func);
       element.addEventListener('click',(e)=>{
            console.log(e.target);
            //e.preventDefault();
           let parent=e.target.closest('.btn--tiny');

           if(parent.classList.contains('btn--increase-servings')||e.target.classList.contains('btn--increase-servings')){
            func(1);
           }
           else func(-1);
        })
     }
}

export default new recipeServingView();