
import {state} from '../js/model'
import resultsview from "./resultsview";
import View from './View';
import icons from 'url:../img/icons.svg';
class BookMark extends View{
    _parentElement=document.querySelector('.bookmarks__list');
    _data;
    handleBookMark(){
       
        let curr=state.currrecipe;
        console.log('hi',curr);
        if(!curr) return ;
        if(state.bookMarks.every((val)=>val.id!==curr.id)){
            state.bookMarks.push(curr);
        }
        else{
            state.bookMarks=state.bookMarks.filter((val)=>val.id!==curr.id)
        }
    
        console.log(state.bookMarks);
        this._setLocalStorage();
        this.render(state.bookMarks);
    }

    addHandlerBookMark(func){
       let bookmarksbtn= document.querySelector('.btn--round');
       bookmarksbtn.addEventListener('click',(e)=>{
        e.preventDefault();
        func();
       })
    }
    _setLocalStorage() {
        localStorage.setItem('bookMarks', JSON.stringify(state.bookMarks));
        //localStorage.setItem('workouts');
      }
    
      _getLocalStorage() {
        let data =JSON.parse(localStorage.getItem('bookMarks'));
        console.log(data);
        if (!data) return;
    //    data=data.filter((val)=>Object.keys(val).length > 0&&val.id);
      // data=data.slice(-1);
      return data;
       
      }

    renderEvents(func){
        ['load'].forEach((val)=>{
            window.addEventListener(val,(e)=>{
              let arr=  this._getLocalStorage();
              if(arr.length>0)
                func(arr);
            
            })
        })
    }

    createView(){
        //let data= state.search.allResult;
     //  console.log('working',this._data);
       let html='';
       state.bookMarks.length>0? this._data.forEach( (data,i)=>{
         
         html+=`<li class="preview ">
               <a class="preview__link " href="#${data.id}">
                 <figure class="preview__fig">
                   <img src="${data.image}" alt="Test" />
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
   
     ):html+=`<div class="message">
                    <div>
                      <svg>
                        <use href="${icons}#icon-smile"></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>`;
    
     return html;
              
      }
   
}

export default new BookMark();