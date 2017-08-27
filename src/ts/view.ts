import {cEmitter} from "./cEmitter";

const ResultTemplate = (()=>{
    let template = document.createElement("result");
    let tname = document.createElement("media-name");
    let tartist = document.createElement("media-artist");
        template.appendChild(tname);
        template.appendChild(tartist);
    return ({id,name,artist}:{id:number,name:string,artist:string})=>{
        template.dataset["id"]=id.toString();
        tname.innerHTML = name;
        tartist.innerHTML = artist;
        return document.importNode(template,true);
    }
})();

export class RadioSet{
    maps: HTMLUnknownElement[];
    private __index: number;
    constructor(rootElement: HTMLUnknownElement) {
        this.__index = 0;
        this.maps = (Array as any).from(rootElement.querySelectorAll("radio"));
        this.injectEvents();
        this.setIndex(0);
    }
    injectEvents(){
        this.maps.forEach((element,index)=>element.addEventListener("click",()=>this.setIndex(index)));
    }
    setIndex(index:number){
        this.index = index;
        this.maps.forEach((element,index)=>{
            if(index === this.index) return element.classList.add("selected");
            element.classList.remove("selected");
        })
    }
    get index(){
        return this.__index;
    }
    set index(number){
        if(Number.isSafeInteger(number)&&number<this.maps.length&&number>-1)
            this.__index = number
    }
}

export class ResultList extends cEmitter{
    pages: {
              id:number,
              name:string,
              artist:string
          }[][];
    point: number;
    MAX_ROWS_PER_PAGE: number;
    rootElement: HTMLUnknownElement;
    constructor(rootElement: HTMLUnknownElement, MaxRowsPerPage = 10) {
        super({select:[]});
        this.rootElement = rootElement;
        this.MAX_ROWS_PER_PAGE = MaxRowsPerPage;
        this.point = 0,this.pages=[];
    }
    render(musicList:{
              id:number,
              name:string,
              artist:string
          }[]){
        this.point = 0;
        this.pages = this.slice(musicList,this.MAX_ROWS_PER_PAGE);
        this.renderPage();
    }
    renderPage(){
        this.rootElement.innerHTML = "";
        this.pages[this.point].forEach(({id,name,artist},index)=>{
            this.rootElement.appendChild(ResultTemplate({id,name,artist}));
            this.rootElement.children[index].addEventListener("click",()=>this.emit(
                "select",{id,name,artist,type:this.rootElement.dataset["type"]}
            ))
        });
        if(this.pages.length>1) this.renderPrevAndNextButton();
    }
    renderPrevAndNextButton(){
        this.rootElement.appendChild((()=>{
            let s = document.createElement("div")
            s.innerHTML = `
                <button-set>
                    ${this.point!==0?"<previous></previous>":""}
                    ${this.point!==this.pages.length-1?"<next></next>":""}
                </button-set>
            `;
            return s.children[0];
        })());
        if(this.point!==0)(this.rootElement.querySelector("previous") as HTMLUnknownElement).addEventListener("click",()=>{
            this.point--;
            this.renderPage();
        });
        if(this.point!==this.pages.length-1)(this.rootElement.querySelector("next") as HTMLUnknownElement).addEventListener("click",()=>{
            this.point++;
            this.renderPage();
        });
    }
    slice(arrayList:any[],perLength:number){
        let length = getLength(arrayList.length,perLength), result = [];
        for(let i =0;i<length;i++){
            result.push(arrayList.slice(i*perLength,(i+1)*perLength));
        }
        return result;
    }
}

function getLength(a:number,b:number){
    return (a-a%b)/b+1;
}