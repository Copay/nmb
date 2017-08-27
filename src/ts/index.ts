import {RadioSet,ResultList} from "view";
import {apiLoader} from "./apiLoader";
import APILoader from "./apiLoader.d";
import "../scss/nmb.scss";
const Template = (() => {
    let template = document.createElement("netease-music-board");
    template.innerHTML = `
        <exiter></exiter>
        <search-box>
            <radio-set>
                <radio id="music">Music</radio>
                <radio id="album">Album</radio>
                <radio id="artist">Artist</radio>
                <radio id="playlist">Playlist</radio>
                <radio id="movie">Movie</radio>
                <radio id="lyric">Lyric</radio>
                <radio id="radio">Radio</radio>
            </radio-set>
            <input type="text" id="inputer">
        </search-box>
        <result-list>
        </result-list>
        `;
    return template;
})();
const NMB = class NMB{
    ResultList: ResultList;
    RadioSet: RadioSet;
    content: HTMLElement;
    constructor() {
        this.content = document.importNode(Template,true);
        this.RadioSet = new RadioSet(
            this.content.querySelector("radio-set") as HTMLUnknownElement
        );
        this.ResultList = new ResultList(
            this.content.querySelector("result-list") as HTMLUnknownElement
        );
        (this.content.querySelector("input") as HTMLInputElement)
            .addEventListener("keypress",
            e=>{if(e.keyCode===13)this.search()});
        (this.content.querySelector("exiter") as HTMLUnknownElement)
            .addEventListener("click",
            e=>this.hide());
    }
    search(){
        const searchType = this.RadioSet.maps[this.RadioSet.index].id;
        (apiLoader as APILoader).search({
            value:(this.content.querySelector("input") as HTMLInputElement).value,
            type:searchType as "music"|"album"|"artist"|"playlist"
                |"movie"|"lyric"|"radio",
            limit:25,
            offset:0
        }).then(json=>json.json())
          .then(json=>json.result)
          .then(res=>(res["songs"]||res["albums"]
                ||res["artists"]||res["playlists"]
                ||res["djRadios"]||res["mvs"]||[])
          .map((a:{
              id:number,
              name:string,
              ar?:any,
              artists?:any,
              artistName?:any,
              creator?:any,
              desc?:any
          })=>({
              id:a.id,
              name:res["djRadios"]?a.desc:a.name,
              artist:res["djRadios"]?a.name:(res["artists"]?"":(a.ar||a.artists||[a.creator]||[a.artistName]).map((x:any)=>(x.name||x.nickname)).join("/ "))
          })))
          .then((w)=>this.ResultList.render(w))
          .then(()=>this.ResultList.rootElement.dataset["type"]=searchType);
    }
    show(){
        document.body.appendChild(this.content);
    }
    hide(){
        document.body.removeChild(this.content);
    }
}
export {NMB,apiLoader}