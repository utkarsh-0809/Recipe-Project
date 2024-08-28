// import { isArray } from 'core-js/core/array';
import { isArray } from 'core-js/./es/array';
import icons from 'url:../img/icons.svg';
export default class View{
    _data
    _parentElement
    _errorMessage
    render(data=this._data){
      // if(!data|| (isArray(data))&&data.length==0) {
      //   this.renderErrorMessage();
      //   return ;
      // }
        this._data=data;
     //   console.log(this._data);
       // console.log(this._parentElement);
        this.clear();
        const html=this.createView();
      //  console.log('hi');
        //console.log(html);
        this._parentElement.insertAdjacentHTML('beforeend',html)
        
       }
 
    clear(){
     this._parentElement.innerHTML='';
    }
 
    //this code wont work exactly in our code now because i choose to different algo
    // and not storing data in dom attribute but in state
    // so inorder to work this store data on dom i.e. data-attribute

    updateData(data){
      // if(!data|| (isArray(data))&&data.length==0) {
      //   this.renderErrorMessage();
      //   return ;
      // }
      this._data=data;
      let html=this.createView();
      
      // this is the new dom which is not visible till now
      let newDOM=document.createRange().createContextualFragment(html);
      let newElements= Array.from(newDOM.querySelectorAll('*'));

      let currElements=Array.from(this._parentElement.querySelectorAll('*'));

      newElements.forEach((val,i)=>{
        let currval=currElements[i];

        if(!val.isEqualNode(currval)
          && val.firstChild?.nodeValue.trim()!==''){
        currval.textContent=val.textContent;
        }

        if(!val.isEqualNode(currval)){
          Array.from(val.attributes).forEach((attr)=>{
            currval.setAttribute(attr.name,attr.value);
          })
        }
      })
    }
 
    renderErrorMessage(message=this._errorMessage){
    let html=` <div class="error">
     <div>
       <svg>
         <use href="${icons}.svg#icon-alert-triangle"></use>
       </svg>
     </div>
     <p>${message}</p>
   </div> 
   `
   this.clear();
   this._parentElement.innerHTML+=html;
    }
 
     renderSpinner(){
     let spinner=`<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> `
    this._parentElement.innerHTML+=spinner;
   }
}