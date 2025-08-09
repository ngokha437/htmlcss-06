function Media() {
  const video = $("#media-video");

  // Main button
  const btnPlay = $("#play-media-btn");
  const btnPause = $("#pause-media-btn");

  const videoProgress = $("#media-progress");
  const videoPlayed = $("#media-played");
  const videoBuffered = $("#media-buffered");
  const currentTime = $("#current-time");
  const totalTime = $("#total-time");

  // Others button
  const btnSoundOn = $("#sound-on-media-btn");
  const btnSoundOff = $("#sound-off-media-btn");
  const btnLoop = $("#loop-media-btn");

  const videoSound = $("#media-sound");
  const soundValue = $("#media-sound-value");

  let ratioWidth = 1;
  let cachedSoundValue = 1;

  // ===== Start: Init =====
  video.addEventListener("loadeddata", () => {
    totalTime.textContent = formatDuration(video.duration);
    videoProgress.max = video.duration;
    ratioWidth = videoProgress.offsetWidth / video.duration;
  });

  video.addEventListener("ended", () => {
    const mediaCenter = $(".dashboard-media__center");
    mediaCenter.classList.add("play");
    mediaCenter.classList.remove("pause");
  });

  videoProgress.addEventListener("input", (event) => {
    video.currentTime = event.target.value;
  });

  videoSound.addEventListener("input", (event) => {
    video.volume = event.target.value;
    cachedSoundValue = event.target.value;
  });
  // ===== End: Init =====

  video.addEventListener("timeupdate", handleTimeUpdate);
  video.addEventListener("volumechange", handleVolume);

  function handleTimeUpdate() {
    currentTime.textContent = formatDuration(video.currentTime);
    videoProgress.value = video.currentTime;
    videoPlayed.style.width = `${video.currentTime * ratioWidth}px`;
    videoBuffered.style.width = `${video.buffered.end(0)}px`;
  }

  function handleVolume() {
    soundValue.style.width = `${videoSound.offsetHeight * video.volume}px`;
    const actionSound = soundValue.closest(".dashboard-media__sound");

    if (video.volume > 0) {
      actionSound.classList.add("sound-on");
      actionSound.classList.remove("sound-off");
    } else {
      actionSound.classList.add("sound-off");
      actionSound.classList.remove("sound-on");
    }
  }

  // ===== Start: Action =====
  btnPlay.addEventListener("click", handlePlay);
  btnPause.addEventListener("click", handlePause);
  btnSoundOn.addEventListener("click", handleSoundOn);
  btnSoundOff.addEventListener("click", handleSoundOff);
  btnLoop.addEventListener("click", handleLoop);

  function toggleClasses(element, classNames) {
    if (Array.isArray(classNames)) {
      classNames.forEach((className) => {
        element.classList.toggle(className);
      });
    }
  }

  function handlePlay() {
    video.play();
    toggleClasses(this.closest(".dashboard-media__center"), ["play", "pause"]);
  }

  function handlePause() {
    video.pause();
    toggleClasses(this.closest(".dashboard-media__center"), ["play", "pause"]);
  }

  function handleSoundOn() {
    video.volume = 0;
    videoSound.value = 0;
    soundValue.style.width = 0;
    toggleClasses(this.closest(".dashboard-media__sound"), [
      "sound-on",
      "sound-off",
    ]);
  }

  function handleSoundOff() {
    video.volume = cachedSoundValue;
    videoSound.value = cachedSoundValue;
    soundValue.style.width = `${videoSound.offsetHeight * cachedSoundValue}px`;
    toggleClasses(this.closest(".dashboard-media__sound"), [
      "sound-on",
      "sound-off",
    ]);
  }

  function handleLoop() {
    toggleClasses(this.closest(".dashboard-media__loop"), ["active"]);
    video.loop = !video.loop;
  }
  // ===== End: Action =====
}

Media.start = function () {
  new Media();
};

export { Media };


