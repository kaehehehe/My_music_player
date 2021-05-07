'use strict';

const musicPlayer = document.querySelector('.music-player');
const musicImg = document.querySelector('.music-image img');
const musicTitle = document.querySelector('.title');
const musicArtist = document.querySelector('.artist');
const musicAudio = document.querySelector('audio');

let musicIndex = 3;

window.addEventListener('load', () => {
  loadMusic(musicIndex);
});

function loadMusic(musicIndex) {
  musicTitle.innerText = musicList[musicIndex].name;
  musicArtist.innerText = musicList[musicIndex].artist;
  musicImg.src = `/image/${musicList[musicIndex].image}.jpg`;
  musicAudio.src = `/audio/${musicList[musicIndex].audio}.mp3`;
}
