class Filter{
    constructor(){

    }
    static Responsive(){
        let contInputsFilter = document.querySelector<HTMLUListElement>("#contaner-filter-search > ul");
        let btnFilterVisible = document.querySelector<HTMLDivElement>("#contaner-filter-search > #cont-btn-filter");
        btnFilterVisible.onclick = ()=>{
            contInputsFilter.style.left = "0%";
        }
        let btnCLoseFilter = document.querySelector<HTMLDivElement>("#contaner-filter-search > ul > #cont-btn-close");
        btnCLoseFilter.onclick = ()=>{
            contInputsFilter.style.left = "-100%";
        }
    }
}

export default Filter;