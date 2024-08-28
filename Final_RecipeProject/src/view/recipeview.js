import icons from 'url:../img/icons.svg';
import {Fraction} from 'fractional';
import View from './View'
import icons from 'url:../img/icons.svg';
import { SERVINGS } from '../js/config';
import { state } from '../js/model';
class RecipeView extends View{
   _parentElement=document.querySelector('.recipe');
  
   _errorMessage=`couldn't find your recipe please try again!`
  
//    _data
//    render(data){
//     this._data=data;
//  //   console.log(this._data);
//    // console.log(this.#parentElement);
//     this.clear();
//     const html=this.createView();
//   //  console.log('hi');
//     //console.log(html);
//     this.#parentElement.insertAdjacentHTML('beforeend',html)
    
//    }

//    clear(){
//     this.#parentElement.innerHTML='';
//    }


   

//    renderErrorMessage(message=this.#errorMessage){
//    let html=` <div class="error">
//     <div>
//       <svg>
//         <use href="${icons}.svg#icon-alert-triangle"></use>
//       </svg>
//     </div>
//     <p>${message}</p>
//   </div> 
//   `
//   this.clear();
//   this.#parentElement.innerHTML+=html;
//    }

//     renderSpinner(){
//     let spinner=`<div class="spinner">
//      <svg>
//        <use href="${icons}#icon-loader"></use>
//      </svg>
//    </div> `
//    this.#parentElement.innerHTML+=spinner;
//   }

// updateServings(val){
//   console.log(document.querySelector('.recipe__info-data--people'));
// document.querySelector('.recipe__info-data--people').textContent=val;
// }
// addHandlerServing(func){
//   //if(!this._parentElement)
//    let element=document.querySelector('.recipe__info-buttons');
//    // console.log(this._parentElement);
//    console.log(func);
//    element.addEventListener('click',(e)=>{
//         console.log(e.target);
//         //e.preventDefault();
//        let parent=e.target.closest('.btn--tiny');

//        if(parent.classList.contains('btn--increase-servings')||e.target.classList.contains('btn--increase-servings')){
//         func(1);
//        }
//        else func(-1);
//     })
//  }

  renderEvents(func){
    console.log(func);
    ["hashchange",'load'].forEach(val=>window.addEventListener(val,(e)=>{
      e.preventDefault();
      func()
    }
    )
    );
   }
   quantityHandler(element){
   let quantity= element.quantity;
   if(!quantity) return '';
   let num=Number(quantity);
   num+= num*(state.servings-SERVINGS)/SERVINGS;
   quantity=new Fraction(num).toString();

   return quantity;
   }
   recipeIngredients(){
    let html='';
    this._data.ingredients.forEach(element => {
       html+=`  <li class="recipe__ingredient">
                <svg class="recipe__icon fa fa-check">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${this.quantityHandler(element)}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${element.unit}</span>
                  ${element.description}
                </div>
              </li>`
    });
    return html;
  }
   createView(){
    state.currrecipe=this._data;
    state.currrecipe.id=window.location.hash.slice(1);
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
           <use href="${icons}#icon-clock"></use>
         
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this._data.time}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${state.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--decrease-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#${state.bookMarks.every((val)=>val.id!==this._data.id)?'icon-bookmark':"icon-bookmark-fill"}"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        
        ${this.recipeIngredients()}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
       
       href="${this._data.source}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    `
   }
}

export default new RecipeView();