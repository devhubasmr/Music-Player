const next = document.querySelector('#next');
const play = document.querySelector('#play');
const prev = document.querySelector('#prev');
const progressBar = document.querySelector('#progress-bar');
const musicTitle = document.querySelector('.music-name');
const musicCard = document.querySelector('.music-card');
const musicArtist = document.querySelector('.music-artist');
const musicCover = document.querySelector('.music-image');
const musicCurrentTime = document.querySelector('.current-time');
const musicDurationTime = document.querySelector('.duration-time');
const backgroundImage = document.querySelector('#backgroundImage');
const music = document.querySelector('audio');
const progressZone = document.querySelector('.music-progress');

let isPlaying = false;

let selectedMusic = 1;

play.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic()
});

const playList = [{
    artist: 'NEFFEX',
    cover: 'cover/sddefault.jpg',
    musicName: 'Losing My Mind',
    musicPath: 'music/Losing My Mind.mp3'
},{
    artist: 'NEFFEX',
    cover: 'cover/maxresdefault.jpg',
    musicName: 'Chasing',
    musicPath: 'music/Chasing.mp3'
},{
    artist: 'NEFFEX',
    cover: 'cover/As You Fade Away.jpg',
    musicName: 'As You Fade Away',
    musicPath: 'music/As You Fade Away.mp3'
},{
    artist: 'NEFFEX',
    cover: 'cover/Good Day.jpg',
    musicName: 'Good Day (Wake Up)',
    musicPath: 'music/Good Day (Wake Up).mp3'
},{
    artist: 'NEFFEX',
    cover: 'cover/Winning.jpg',
    musicName: 'Winning',
    musicPath: 'music/Winning.mp3'
}]

const playMusic = () => {
    music.play();
    document.querySelector('.play-icon').classList.replace('fa-play', 'fa-pause')
    isPlaying = true;
    fadeInCover();
    musicCard.classList.add('middle-weight');
    setTimeout(() => {
        musicCard.classList.remove('middle-weight');
    }, 200);
}

const pauseMusic = () =>{
    music.pause();
    document.querySelector('.play-icon').classList.replace('fa-pause', 'fa-play')
    isPlaying = false;
    fadeInCover();
    musicCard.classList.add('middle-weight');
    setTimeout(() => {
        musicCard.classList.remove('middle-weight');
    }, 200);
}

const nextMusic = () =>{
    selectedMusic = (selectedMusic + 1) % playList.length
    loadMusic(playList[selectedMusic]);
    music.duration = 0;
    if ( isPlaying){
        music.play()
    }

    musicCard.classList.add('right-weight');
    progressBar.style.width = `0%`
    setTimeout(() =>{
        musicCard.classList.remove('right-weight')
    }, 200)
}

const prevMusic = () =>{
    selectedMusic = (selectedMusic - 1 + playList.length) % playList.length
    loadMusic(playList[selectedMusic]);
    if (isPlaying){
        music.play()
    }

    musicCard.classList.add('left-weight');
    progressBar.style.width = `0%`
    setTimeout(() =>{
        musicCard.classList.remove('left-weight')
    }, 200)
}

const loadMusic = (playList) =>{
    musicArtist.textContent = playList.artist;
    musicTitle.textContent = playList.musicName;
    music.src = playList.musicPath;
    musicCover.src = `${playList.cover}`;
    backgroundImage.src = `${playList.cover}`;
    backgroundImage.animate([{
        opacity: 0,
    },{
        opacity: 1,
    },{
        duration: 400,
    }]);
    fadeInCover();
}

const fadeInCover = () => {
    musicCover.classList.add('animate')
    setTimeout(() =>{
        musicCover.classList.remove('animate')
    }, 300)
}

const updateProgress = (e) =>{
    const {
        duration,
        currentTime
    } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100
    progressBar.style.width = `${progressPercent}%`
    if(progressPercent == 100){
        setTimeout(() =>{
            nextMusic()
        }, 500)
    }
}

function setProgress(e){
    const width = this.clientWidth;
    const setPoint = e.offsetX;
    const duration = music.duration;
    music.currentTime = (setPoint / width) * duration;
}

const setMusicTime = (e) =>{
    const {
        duration,
        currentTime
    } = e.srcElement;
    calcSongTime(duration, musicDurationTime);
    calcSongTime(currentTime, musicCurrentTime);
}

const calcSongTime = (time, selectTime) =>{
    time = Number(time);
    const m = Math.floor(time % 3600 / 60);
    const s = Math.floor(time % 3600 % 60);
    if ( m < 10) {
        minute = "0" + m;
    } else minute = m
    if (s < 10) {
        second = "0" + s;
    } else second = s
    return selectTime.textContent = `${minute}:${second}`;
}

next.addEventListener('click', nextMusic);
prev.addEventListener('click', prevMusic);
music.addEventListener('timeupdate', updateProgress);
music.addEventListener('timeupdate', setMusicTime);
progressZone.addEventListener('click', setProgress)


function cardAnimate(e){
    this.querySelectorAll('.music-card').forEach(function(boxMove){
        const x = -((window.innerWidth) / 3 - e.pageX) / 90
        const y = ((window.innerHeight) / 3 - e.pageY) / 30
        boxMove.style.transform = "rotateY("+ x + "deg) rotateX("+ y + "deg)"
    });
}


