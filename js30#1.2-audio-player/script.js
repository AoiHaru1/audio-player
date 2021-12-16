window.addEventListener("load", () => {

  // elements
  const audioWindow = document.querySelector('.audio-player__image-window');
  const audio = document.querySelector('audio');
  const playButton = document.querySelector('.play img');
  const timerEnd = document.querySelector('.rageInput__endTime');
  const bgImg = document.querySelector('.bg-img');
  const nextSong = document.querySelector('.next');
  const prevSong = document.querySelector('.prev');
  const titleName = document.querySelector('h3');
  
  // other values
  const timerDuration = Math.floor(audio.duration)
  const listOfMusic = ["./assets/audio/Diplo, SIDEPIECE - On My Mind.mp3", "./assets/audio/Eluveitie - Brictom.mp3", 
                       "./assets/audio/Flobots - Handlebars.mp3"];
  const listOfBackgrounds = ["'./assets/img/Diplo\,\ SIDEPIECE\ -\ On\ My\ Mind.png'", "'./assets/img/Eluveitie\ -\ Brictom.png'",
                             "'./assets/img/Flobots\ -\ Handlebars.png'"];
  const listOfNames = ["SIDEPIECE - On My Mind", "Eluveitie - Brictom", "Flobots - Handlebars"];

  // set volume to low
  audio.volume = 0.01;


  // set timer end

  getZero = x => +x < 10 ? `0${x}` : x
  setTimerEnd = (s) => timerEnd.innerHTML = `${getZero(Math.floor(s / 60))}:${getZero(s % 60)}`

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
    if (audio.classList.contains('active')) {
      audio.pause()
    } else {
      audio.play()
    }
    audio.classList.toggle('active')
    swapButtonIcons()
  })

  // switch song

  let index = 0;
 
  setNewItems = (i) => {
    bgImg.style.backgroundImage = `url(${listOfBackgrounds[index]})`
    audioWindow.style.backgroundImage = `url(${listOfBackgrounds[index]})`
    audio.src = listOfMusic[index]
    titleName.innerHTML = listOfNames[index]
    setTimeout(() => setTimerEnd(Math.floor(audio.duration)), 20)
  }

  nextSong.addEventListener('click', () => {
    audio.classList.contains('active') ? audio.autoplay = "true" : audio.autoplay = "" 
    index += 1
    index === listOfMusic.length ? index = 0 : null
    setNewItems(index)
  })

  prevSong.addEventListener('click', () => {
    audio.classList.contains('active') ? audio.autoplay = "true" : audio.autoplay = "" 
    index -= 1
    index < 0 ? index = listOfMusic.length - 1 : null
    setNewItems(index)
  })

  
})


