window.addEventListener("load", () => {

  // elements
  const audioWindow = document.querySelector('.audio-player__image-window');
  const audio = document.querySelector('audio');
  const playButton = document.querySelector('.play img');
  const timerEnd = document.querySelector('.rageInput__endTime');
  const timerStart = document.querySelector('.rangeInput__currentTime')
  const bgImg = document.querySelector('.bg-img');
  const nextSong = document.querySelector('.next');
  const prevSong = document.querySelector('.prev');
  const titleName = document.querySelector('h3');
  const inputRange = document.querySelector('.audio-range');

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
  setTimerEnd = (e) => timerEnd.innerHTML = `${getZero(Math.floor(e / 60))}:${getZero(e % 60)}`
  setTimerStart = (s) => timerStart.innerHTML = `${getZero(Math.floor(s / 60))}:${getZero(s % 60)}`

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
      clearInterval(inputInetrval)
    } else {
      audio.play()
      inputInetrval = setInterval(inputChangeOnPlay, 1000)
    }
    audio.classList.toggle('active')
    swapButtonIcons()
  })

  // switch song

  nextSong.click()

  let index = 0;

  setNewItems = (i) => {
    bgImg.style.backgroundImage = `url(${listOfBackgrounds[index]})`;
    audioWindow.style.backgroundImage = `url(${listOfBackgrounds[index]})`;
    audio.src = listOfMusic[index];
    titleName.innerHTML = listOfNames[index];
    inputRange.value = 0;
    currentTimer = 0;
    setTimerStart(currentTimer)
    setTimeout(setInputRange, 50);
    setTimeout(() => setTimerEnd(Math.floor(audio.duration)), 20);
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

  // input implement
  let inputInetrval;
  let currentTimer = 0;

  setInputRange = () => inputRange.max = Math.floor(+audio.duration)

  inputChangeOnPlay = () => {
    inputRange.value = +inputRange.value + 1;
    currentTimer += 1
    setTimerStart(currentTimer)
    if (+inputRange.value == +inputRange.max) {
      setTimeout(() => {
        audio.classList.contains('active') ? audio.autoplay = "true" : audio.autoplay = ""
        index += 1
        index === listOfMusic.length ? index = 0 : null
        setNewItems(index)
      }, 500)
    }
  }

  inputRange.addEventListener('input', () => {
    currentTimer = +inputRange.value
    setTimerStart(currentTimer)
    console.log(inputRange.value)
  })

  inputRange.addEventListener('change', () => {
    audio.currentTime = +inputRange.value
  })


})


