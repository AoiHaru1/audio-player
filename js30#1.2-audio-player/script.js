window.addEventListener("load", () => {

  // elements;
  const audioWindow = document.querySelector('.audio-player__image-window');
  const audio = document.querySelector('audio');
  const playButton = document.querySelector('.play img');
  const timerEnd = document.querySelector('.rageInput__endTime');
  const timerStart = document.querySelector('.rangeInput__currentTime');
  const bgImg = document.querySelector('.bg-img');
  const nextSong = document.querySelector('.next');
  const prevSong = document.querySelector('.prev');
  const titleName = document.querySelector('h3');
  const inputRange = document.querySelector('.audio-range');
  const volumeRange = document.querySelector('.volume-input');
  const volumeImg = document.querySelector('.volume-image')

  // other values
  const timerDuration = Math.floor(audio.duration);
  const listOfMusic = ["Diplo, SIDEPIECE - On My Mind", "Eluveitie - Brictom", "Flobots - Handlebars", "Radiohead — Karma Police", "The Birthday Massacre - Red Stars"];


  // set volume to low
  audio.volume = 0.1;

  // get song path func

  getBgName = item => './assets/img/' + item + '.png';
  getSongPath = item => './assets/audio/' + item + '.mp3'

  // set timer end/start

  const getZero = x => +x < 10 ? `0${x}` : x;
  const getNum = (s) => `${getZero(Math.floor(s / 60))}:${getZero(s % 60)}`
  const setTimerEnd = (e) => timerEnd.innerHTML = getNum(e);
  const setTimerStart = (e) => timerStart.innerHTML = getNum(e);

  // is active check 

  getActiveState = () => audio.classList.contains('active')

  // button swap animation

  const swapButtonIcons = () => {
    playButton.style.opacity = 0;
    setTimeout(() => {
      playButton.style.opacity = 1;
      getActiveState() ? playButton.src = "./assets/buttons/pause-button.png" : playButton.src = "./assets/buttons/play-button.png";
    }, 300);
  };


  // audio implement

  playButton.addEventListener('click', () => {
    if (getActiveState()) {
      audio.pause();
      clearInterval(inputInterval);
    } else {
      audio.play();
      inputInterval = setInterval(inputChangeOnPlay, 100);
    }
    audio.classList.toggle('active');
    swapButtonIcons();
  });

  // set new song

  let index = 0;
  let endTimeInterval;

  const setNewItems = (i) => {
    bgImg.style.backgroundImage = `url('${getBgName(listOfMusic[i])}')`;
    audioWindow.style.backgroundImage = `url('${getBgName(listOfMusic[i])}')`;
    audio.src = getSongPath(listOfMusic[i]);
    titleName.innerHTML = listOfMusic[i];
    inputRange.value = 0;
    currentTimer = 0;
    clearInterval(endTimeInterval);
    endTimeInterval = setInterval(() => {
      let time = setTimerEnd(Math.floor(audio.duration));
      if (time === 'NaN:NaN') {
        timerEnd.innerHTML = 'loading';
      } else {
        clearInterval(endTimeInterval);
        setTimerStart(Math.floor(currentTimer));
      }
    }, 40);
  };

  // listeners for button change

  nextSong.addEventListener('click', () => {
    getActiveState() ? audio.autoplay = "true" : audio.autoplay = "";
    index = (index + 1) % listOfMusic.length
    setNewItems(index);
  });

  prevSong.addEventListener('click', () => {
    getActiveState() ? audio.autoplay = "true" : audio.autoplay = "";
    index = index - 1 < 0 ? listOfMusic.length - 1 : index - 1
    setNewItems(index);
  });

  // input implement
  let inputInterval;
  let currentTimer = 0;
  let secondTracker = 0;

  const setInputRange = () => inputRange.max = (Math.floor(+audio.duration * 10));

  const inputChangeOnPlay = () => {
    setInputRange();
    secondTracker = (+secondTracker + 0.1).toFixed(1);
    secondTracker % 1 === 0 ? inputRange.value = +inputRange.value + 10 : null;

    currentTimer += 0.1;
    setTimerStart(Math.floor(currentTimer));

    timerStart.innerHTML == timerEnd.innerHTML ? songChanger() : null;
  };

  // implement song changer

  const songChanger = () => {
    clearInterval(inputInterval);
    secondTracker = 0;
    if (getActiveState()) {
      audio.autoplay = "true";
      inputInterval = setInterval(inputChangeOnPlay, 100);
    } else {
      audio.autoplay = "";
    }
    index = (index + 1) % listOfMusic.length
    setNewItems(index);
  };

  // song changer on slider hold

  let songEnderInt;
  let activeIntervalCheck = false;

  const songEnderChecker = () => {
    if (audio.currentTime >= audio.duration) {
      songChanger();
      activeIntervalCheck = false;
      clearInterval(songEnderInt);
      clearInterval(inputInterval);
    }
  };

  // input listeners

  inputRange.addEventListener('input', () => {
    if (activeIntervalCheck === false) {
      activeIntervalCheck = true;
      songEnderInt = setInterval(songEnderChecker, 200);
    }
    setInputRange();
    clearInterval(inputInterval);
    currentTimer = Math.floor(+inputRange.value / 10);
    setTimerStart(currentTimer);
  });

  inputRange.addEventListener('change', () => {
    getActiveState() ? inputInterval = setInterval(inputChangeOnPlay, 100) : null;
    audio.currentTime = Math.floor(+inputRange.value / 10);
  });


  //  implement volume change

  let volumeMuteState = false;
  let lastValueStore;
  
  lowValueChecker = x => x < 10 ? `0.0${x}` : `0.${x}`;

  swapVolumeIcons = () => volumeImg.src = volumeMuteState ? "./assets/buttons/mute.png" : "./assets/buttons/volume.png"

  volumeRange.addEventListener('input', () => {
    lastValueStore = volumeRange.value
    audio.volume = lowValueChecker(volumeRange.value)
    if (volumeRange.value >= 1) {
      volumeMuteState = false;
      swapVolumeIcons()
    }
    if (volumeRange.value == 0) {
      volumeMuteState = true;
      swapVolumeIcons()
    }
  })
  
  volumeImg.addEventListener('click', () => {
    if (lastValueStore == 0) {
      swapVolumeIcons()
    } else if (!volumeMuteState) {
      volumeMuteState = true;
      lastValueStore = volumeRange.value
      volumeRange.value = 0;
      audio.volume = 0;
      swapVolumeIcons()
    } else {
      volumeRange.value = lastValueStore
      audio.volume = lowValueChecker(lastValueStore)
      volumeMuteState = false;
      swapVolumeIcons()
    }
  })

});


