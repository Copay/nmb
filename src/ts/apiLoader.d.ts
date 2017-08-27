export default interface APILoader{
    song:({br}:{br:number})=>string;
    lyric:({id}:{id:number})=>Promise<Response>;
    comments:({limit,offset}:{
                limit:number,
                offset:number
            })=>Promise<Response>;
    detail:({id}:{id:number})=>Promise<Response>;
    artist:({limit,offset}:{
                limit:number,
                offset:number
            })=>Promise<Response>;
    album:({id}:{id:number})=>Promise<Response>;
    playlist:({id}:{id:number})=>Promise<Response>;
    mv:({id}:{id:number})=>Promise<Response>;
    djradio:({id}:{id:number})=>Promise<Response>;
    dj:({id}:{id:number})=>Promise<Response>;
    detailDj:({id}:{id:number})=>Promise<Response>;
    search:({value,type,limit,offset}:{
                value:string,
                type:"music"|"album"|"artist"|"playlist"
                |"movie"|"lyric"|"radio",
                limit:number,
                offset:number
            })=>Promise<Response>;
}