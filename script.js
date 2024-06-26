//fetch songs folder, since they are in table format we must parse them
//await is only possible with async, so must put it inside that function
let currentSong = new Audio();
let songs;

async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response =  await a.text();
    let div = document.createElement("div");
    div.innerHTML = response; 
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }   
    }
    return songs;
}
const playMusic = (track)=>{
    currentSong.src = "/songs/" + track;
    currentSong.play();
    play1.src = "pause.svg";
    document.querySelector(".songinfo").innerHTML = track;

}
async function main(){


    songs = await getSongs();
    console.log(songs);
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0,0,256,256">
                            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M13,4c-4.95852,0 -9,4.04148 -9,9v24c0,4.95852 4.04148,9 9,9h24c4.95852,0 9,-4.04148 9,-9v-24c0,-4.95852 -4.04148,-9 -9,-9zM13,6h24c3.87748,0 7,3.12252 7,7v24c0,3.87748 -3.12252,7 -7,7h-24c-3.87748,0 -7,-3.12252 -7,-7v-24c0,-3.87748 3.12252,-7 7,-7zM33.56055,11.00195c-0.1102,-0.00551 -0.22319,0.00237 -0.33594,0.02344h-0.00195l-12.5918,2.36133c-0.93916,0.17671 -1.63086,1.0104 -1.63086,1.9668v13.63281c-0.00003,0.00456 -0.00003,0.00911 0,0.01367c0,1.11667 -0.88333,2 -2,2h-1.83008c-2.12318,0 -4.04921,1.59414 -4.16406,3.78711c-0.11896,2.28668 1.72625,4.21289 3.99414,4.21289h0.5c3.02558,0 5.5,-2.47442 5.5,-5.5v-4.5v-8.54492l12,-2.25v7.79492c0,1.11667 -0.88333,2 -2,2h-1.83008c-2.12318,0 -4.04921,1.59414 -4.16406,3.78711c-0.11896,2.28668 1.72625,4.21289 3.99414,4.21289h0.5c3.02558,0 5.5,-2.47442 5.5,-5.5v-4.5v-13.5c0,-0.80256 -0.66803,-1.45946 -1.43945,-1.49805zM33,13.10352v3.06641l-12,2.25v-3.06641zM33,29.38086v1.11914c0,1.94442 -1.55558,3.5 -3.5,3.5h-0.5c-1.1521,0 -2.05909,-0.93605 -1.99805,-2.10937c0.05515,-1.05303 1.04315,-1.89062 2.16797,-1.89062h1.83008c0.74266,0 1.40187,-0.26166 2,-0.61914zM19,32.38086v1.11914c0,1.94442 -1.55558,3.5 -3.5,3.5h-0.5c-1.15211,0 -2.05909,-0.93605 -1.99805,-2.10937c0.05515,-1.05303 1.04315,-1.89062 2.16797,-1.89062h1.83008c0.74266,0 1.40187,-0.26166 2,-0.61914z"></path></g></g>
                            </svg>
                            <div class="info">
                                <div> ${song.replaceAll("%20"," ")}</div> 
                            </div>
                            <div class="playbutton">
                            <img src="play2.png" width="30px">
                        </div>
                
        </li>`;
    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    play1.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
            play1.src = "pause.svg";
        }else{
        currentSong.pause();
        play1.src = "play1.svg";
        }

    } )
}
main();