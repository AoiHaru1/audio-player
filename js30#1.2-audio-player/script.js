window.addEventListener("load", () => {

  // elements
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

  // other values
  const timerDuration = Math.floor(audio.duration);
  const listOfMusic = ["./assets/audio/Diplo, SIDEPIECE - On My Mind.mp3", "./assets/audio/Eluveitie - Brictom.mp3",
    "./assets/audio/Flobots - Handlebars.mp3"];
  const listOfBackgrounds = ["'./assets/img/Diplo\,\ SIDEPIECE\ -\ On\ My\ Mind.png'", "'./assets/img/Eluveitie\ -\ Brictom.png'",
    "'./assets/img/Flobots\ -\ Handlebars.png'"];
  const listOfNames = ["SIDEPIECE - On My Mind", "Eluveitie - Brictom", "Flobots - Handlebars"];

  // set volume to low
  audio.volume = 0.01;

  // set timer end/start

  const getZero = x => +x < 10 ? `0${x}` : x;
  const setTimerEnd = (e) => timerEnd.innerHTML = `${getZero(Math.floor(e / 60))}:${getZero(e % 60)}`;
  const setTimerStart = (s) => timerStart.innerHTML = `${getZero(Math.floor(s / 60))}:${getZero(s % 60)}`;

  // button swap animation

  const swapButtonIcons = () => {
    playButton.style.opacity = 0;
    setTimeout(() => {
      playButton.style.opacity = 1;
      audio.classList.contains('active') ? playButton.src = "./assets/buttons/pause-button.png" : playButton.src = "./assets/buttons/play-button.png";
    }, 300);
  };

  // audio implement

  playButton.addEventListener('click', () => {
    if (audio.classList.contains('active')) {
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

  const setNewItems = (i) => {
    bgImg.style.backgroundImage = `url(${listOfBackgrounds[index]})`;
    audioWindow.style.backgroundImage = `url(${listOfBackgrounds[index]})`;
    audio.src = listOfMusic[index];
    titleName.innerHTML = listOfNames[index];
    inputRange.value = 0;
    currentTimer = 0;
    setTimerStart(currentTimer);
    setTimeout(() => setTimerEnd(Math.floor(audio.duration)), 20);
  };

  // listeners for button change

  nextSong.addEventListener('click', () => {
    audio.classList.contains('active') ? audio.autoplay = "true" : audio.autoplay = "";
    index += 1;
    index === listOfMusic.length ? index = 0 : null;
    setNewItems(index);
  });

  prevSong.addEventListener('click', () => {
    audio.classList.contains('active') ? audio.autoplay = "true" : audio.autoplay = "";
    index -= 1;
    index < 0 ? index = listOfMusic.length - 1 : null;
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
      if (audio.classList.contains('active')) {
        audio.autoplay = "true";
        inputInterval = setInterval(inputChangeOnPlay, 100);
      } else {
        audio.autoplay = "";
      }
      index += 1;
      index === listOfMusic.length ? index = 0 : null;
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
    audio.classList.contains('active') ? inputInterval = setInterval(inputChangeOnPlay, 100) : null;
    audio.currentTime = Math.floor(+inputRange.value / 10);
  });


});


