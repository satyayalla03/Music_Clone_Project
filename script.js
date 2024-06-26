console.log("Welcome to Spotify");

//Initialize the Variables
let songIndex=0;
let audioElement=new Audio('songs/music1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Rock n Roll", filePath : "songs/music1.mp3", coverPath:"covers/music_cover.jpg"},
    {songName:"Rain and Piano", filePath : "songs/music2.mp3", coverPath:"covers/music_cover2.jpg"},
    {songName:"End of Beginning", filePath : "songs/music3.mp3", coverPath:"covers/music_cover3.jpg"},
    {songName:"I Wanna Be Yours", filePath : "songs/music4.mp3", coverPath:"covers/music_cover4.jpg"},
    {songName:"One of the Girls", filePath : "songs/music5.mp3", coverPath:"covers/music_cover5.jpg"},
    {songName:"Fortnight", filePath : "songs/music6.mp3", coverPath:"covers/music_cover6.jpg"},
    {songName:"Oh My Baby", filePath : "songs/music7.mp3", coverPath:"covers/music_cover7.jpg"},
    {songName:"Golden Hour", filePath : "songs/music8.mp3", coverPath:"covers/music_cover8.jpg"},
    {songName:"Experience - Interstellar", filePath : "songs/music9.mp3", coverPath:"covers/music_cover9.jpg"},
    {songName:"Satranga", filePath : "songs/music10.mp3", coverPath:"covers/music_cover10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
//audioElement.play();

//Handle Play/Pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    ///Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src= `songs/music${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }) 
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src= `songs/music${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src= `songs/music${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})