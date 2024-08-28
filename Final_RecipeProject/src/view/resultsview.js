import View from "./View";
import {state} from '../js/model'
import icons from 'url:../img/icons.svg';
import { RANGE } from "../js/config";
 class ResultsView extends View{
 
    _parentElement=document.querySelector('.results');
    _errorMessage=`couldn't find your recipe please try again!`;
    
  
    
  addActive(val,i){
  //  val=Number(val);
    let hash=(window.location.hash.slice(1));
    console.log(hash,val);
    if(hash==val){
      
      return 'preview__link--active';
     
    }
    else return '';
  }



//    render(){
//     //this.renderSpinner();
//     let html=this.showResult();

//     this.clear;
//     this._parentElement.insertAdjacentHTML('afterbegin',html);
//    }
   
createView(){
     //let data= state.search.allResult;
  //  console.log('working',this._data);
    let html='';
     this._data.forEach( (data,i)=>{
      if(i>=state.range-RANGE&&i<=state.range){
      html+=`<li class="preview ${this.addActive(data.id,i)}">
            <a class="preview__link " href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
           `
      }

    

}
   
  );
 
  return html;
           
   }
}

export default new ResultsView();