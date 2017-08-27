///<reference path="./apiLoader.d.ts" /> 
import APILoader from "./apiLoader.d";

const { api } = require("../../config.json");
const searchType = {
    music:"1",
    album:"10",
    artist:"100",
    playlist:"1000",
    movie:"1004",
    lyric:"1006",
    radio:"1009"
};
const type = ["song","lyric","comments","detail",
              "artist","album","playlist","mv",
              "djradio","dj","detail_dj","search"];

//Create API urls
const searchAPIs = (()=>{
    let o:{[propName:string]:string} = {};
    Object.getOwnPropertyNames(searchType).forEach((val:keyof typeof searchType)=>{
        o[val] = api+"?search_type="+searchType[val]+"&type=search"
    });
    return o;
})();
const APIs = (()=>{
    let o:{[propName:string]:string} = {};
    type.forEach(val=>{
        o[val.replace(/_(.)/gi,e=>e.toUpperCase())] 
            = api
                +"?type="
                +val
    });
    return o;
})();

//func Creator
function creator(key:string){
    switch(key){
        case "search":
            return ({value,type,limit,offset}:{
                value:string,
                type:keyof typeof searchType,
                limit:number,
                offset:number
            })=>
                fetch(searchAPIs[type]
                    +"&s="+value
                    +"&limit="+limit
                    +"&offset="+offset
                );
        case "artist":
        case "comments":
            return ({limit,offset,id}:{
                limit:number,
                offset:number,
                id:number
            })=>
                fetch(APIs[key]
                    +"&limit="+limit
                    +"&offset="+offset
                    +"&id="+id
                );
        case "song":
            return ({br,id}:{br:number,id:number})=>APIs[key]+"&raw=true&br="+br+"&id="+id;
        default:
            return ({id}:{id:number})=>
                fetch(APIs[key]
                    +"&id="+id
                );
    }
}

//Create API Functions
export const apiLoader = (()=>{
    let o:{[propName:string]:any} = {};
    Object.getOwnPropertyNames(APIs).forEach(key=>{
        o[key] = creator(key);
    });
    return o;
})();