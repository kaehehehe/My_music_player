'use strict';

const musicPlayer = document.querySelector('.music-player');
const musicImg = document.querySelector('.music-image img');
const musicTitle = document.querySelector('.title');
const musicArtist = document.querySelector('.artist');
const musicAudio = document.querySelector('audio');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

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