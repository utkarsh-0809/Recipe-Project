class SearchView{
    #parent=document.querySelector('.search');

    getQuery(){

        
        const query=this.#parent.querySelector('.search__field').value;
        this.#clear();
        console.log('shit2',query);
        return query;
    }

    #clear(){
        this.#parent.querySelector('.search__field').value='';
    }

    addHandlerSearch(func){
        this.#parent.addEventListener('submit',(e)=>{
            e.preventDefault();
            func();
        })
    }
};

export default new SearchView();