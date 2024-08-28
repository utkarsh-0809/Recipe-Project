import {state} from '../js/model';
import icons from 'url:../img/icons.svg';

import { RANGE } from '../js/config';
class Pagination{
    _parentElement=document.querySelector('.pagination');
    
    render(){
        this._parentElement.innerHTML='';
        let html='';
          

 html+= (
    state.range>=RANGE&&state.range<state.search.allResult.length?
`<button class="btn--inline pagination__btn--next">
 <span>Page ${(state.range/RANGE)+1}</span>
 <svg class="search__icon">
   <use href="${icons}#icon-arrow-right"></use>
 </svg>
</button> 
`:'')
html+=(

    state.range>RANGE?
    `<button class="btn--inline pagination__btn--prev">
     <svg class="search__icon">
       <use href="${icons}#icon-arrow-left"></use>
     </svg>
     <span>Page ${(state.range/RANGE)-1}</span>
    </button>`:'')
          
    this._parentElement.insertAdjacentHTML('beforeend',html);

    }

    addHandlerPage(func){
       this._parentElement.addEventListener('click',(e)=>{
       // e.preventDefault();
        console.log(e.target);

        let parent=e.target.closest('.btn--inline');
        console.log(parent);
        if(parent.classList.contains('pagination__btn--prev')||e.target.classList.contains('pagination__btn--prev')){
            this.decrease();
        //    let binded= func.bind(resultsview);
        //    console.log(binded());
        // //    binded(state.search.allResult);
        //       binded();
        func();
        }
        if(parent.classList.contains('pagination__btn--next')||e.target.classList.contains('pagination__btn--next')){
            this.increase();
            // let binded= func.bind(resultsview);
            // console.log(binded);
            // binded();
            func();
        }
       })
    }
    increase(){
        state.range+=RANGE;
        console.log(state.range);
        this.render();
    }

    decrease(){
        
        state.range-=RANGE;
        console.log(state.range);
        this.render();
    }
}


export default new Pagination();
