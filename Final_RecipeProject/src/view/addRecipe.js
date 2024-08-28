import View from "./View";

class AddRecipe extends View{
    _parentElement=document.querySelector('.add-recipe-window');
    _formData=document.querySelector('.upload');
     _close=document.querySelector('.btn--close-modal');
    _overlay=document.querySelector('.overlay');
    addHandler(){
        let btn=document.querySelector('.nav__btn--add-recipe');
        let close=document.querySelector('.btn--close-modal');
        let overlay=document.querySelector('.overlay');
        btn.addEventListener('click',(e)=>{
            e.preventDefault();
            this._parentElement.classList.toggle('hidden');
            overlay.classList.toggle('hidden');
        });

        close.addEventListener('click',(e)=>{
            e.preventDefault();
            
        })

    }
    closeWindow(){
        this._parentElement.classList.add('hidden');
        this._overlay.classList.add('hidden')
    }


    addHandlerUpload(func){
        this._parentElement.addEventListener('submit',(e)=>{
            e.preventDefault();
            let dataArr=[...new FormData(this._formData)];
            let data= Object.fromEntries(dataArr);
            func(data);
        }

        )
       
    }
}

export default new AddRecipe();