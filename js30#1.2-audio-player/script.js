// elements
const audioWindow = document.querySelector('.audio-player__image-window');
const audio = document.querySelector('audio');
const playButton = document.querySelector('.play img');
audio.volume = 0.01


// button swap animation

const swapButtonIcons = () => {
  playButton.style.opacity = 0
  setTimeout(() => {
    playButton.style.opacity = 1;
    audio.classList.contains('active') ? playButton.src = "./assets/buttons/pause-button.png" : 
    playButton.src = "./assets/buttons/play-button.png";
  }, 400)
}

// audio implement

playButton.addEventListener('click', () => {
  audio.classList.contains('active') ? audio.pause() : audio.play()
  audio.classList.toggle('active')
  swapButtonIcons()
})


