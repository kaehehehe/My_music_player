'use strict';

const musicPlayer = document.querySelector('.music-player');
const musicImg = document.querySelector('.music-image img');
const musicTitle = document.querySelector('.title');
const musicArtist = document.querySelector('.artist');
const musicAudio = document.querySelector('audio');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const progressBar = document.querySelector('.music-duration');
const progressArea = document.querySelector('.progress-bar');
const repeatBtn = document.querySelector('#repeat');

let musicNum = 1;

window.addEventListener('load', () => {
  loadMusic(musicNum);
});

function loadMusic(index) {
  musicTitle.innerText = musicList[index -1].name;
  musicArtist.innerText = musicList[index -1].artist;
  musicImg.src = `/image/${musicList[index -1].image}.jpg`;
  musicAudio.src = `/audio/${musicList[index -1].audio}.mp3`;
}

function playMusic() {
  musicAudio.classList.add('paused');
  playBtn.innerText = 'pause';
  musicAudio.play();
}

function pauseMusic() {
  musicAudio.classList.remove('paused');
  playBtn.innerText = 'play_arrow';
  musicAudio.pause();
}

function nextMusic() {
  musicNum ++;
  musicNum > musicList.length ? musicNum = 1 : musicNum = musicNum;
  loadMusic(musicNum);
  playMusic();
  
}

function prevMusic() {
  musicNum --;
  musicNum < 1 ? musicNum = musicList.length : musicNum = musicNum;
  loadMusic(musicNum);
  playMusic();
}

playBtn.addEventListener('click', () => {
  const isMusicPaused = musicAudio.classList.contains('paused');
  isMusicPaused ? pauseMusic(): playMusic() ;
});

nextBtn.addEventListener('click', () => {
  nextMusic();
});

prevBtn.addEventListener('click', () => {
  prevMusic();
});

musicAudio.addEventListener('timeupdate', (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWith = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWith}%`;

  let musicCurrentTime = document.querySelector('.current');
  let musicDuration = document.querySelector('.duration');

  musicAudio.addEventListener('loadeddata', () => {
    let totalDuration = musicAudio.duration;
    
    let totalMin = Math.floor(totalDuration / 60);
    let totalSec = Math.floor(totalDuration % 60);
    totalSec < 10 ? totalSec = `0${totalSec}` : totalSec = totalSec;
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor( currentTime / 60);
  let currentSec = Math.floor( currentTime % 60);
  currentSec < 10 ? currentSec = `0${currentSec}` : currentSec = currentSec;
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener('click', (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let musicDuration = musicAudio.duration;

  musicAudio.currentTime = (clickedOffsetX / progressWidth) * musicDuration;
});

repeatBtn.addEventListener('click', () => {
  let getText = repeatBtn.innerText;

  switch(getText) {
    case 'repeat':
      repeatBtn.innerText = 'repeat_one';
      repeatBtn.setAttribute('title', 'Repeat track')
      break;
    case 'repeat_one':
      repeatBtn.innerText = 'shuffle';
      repeatBtn.setAttribute('title', 'Shuffle');
      break;
    case 'shuffle':
      repeatBtn.innerText = 'repeat';
      repeatBtn.setAttribute('title', 'Repeat')
      break;
  }
});

musicAudio.addEventListener('ended', () => {
  let getText = repeatBtn.innerText;

  switch(getText) {
    case 'repeat':
      nextMusic();
      break;
    case 'repeat_one':
      playMusic();
      break;
    case 'shuffle':
      let randomIndex = Math.floor((Math.random() * musicList.length) +1);
      do {
        randomIndex = Math.floor((Math.random() * musicList.length) +1);
      } while (musicNum == randomIndex);
      musicNum = randomIndex;
      loadMusic(musicNum);
      playMusic();
      break;
  }
});


