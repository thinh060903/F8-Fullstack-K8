var progressBar = document.querySelector(".progress-bar");
var progress = document.querySelector(".progress");
var progressSpan = progress.querySelector(".progress-span");

var offsetX = 0;
var initialClientX = 0;
var lastMoveSpace = 0;
var moveSpace = 0;
var isDragging = false;
var progressBarWidth = progressBar.clientWidth;
var audio = document.querySelector("audio");
var durationEl = progressBar.nextElementSibling;
var currentTimeEl = progressBar.previousElementSibling;
var playActionEl = document.querySelector(".play-action i");
var duration = 0;

var setDuration = function () {
  duration = audio.duration;
};

var getTimeFormat = function (seconds) {
  var mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

window.addEventListener("load", function () {
  setDuration();
  durationEl.innerText = getTimeFormat(audio.duration);
});

playActionEl.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", function () {
  playActionEl.classList.replace("fa-play", "fa-pause");
});

audio.addEventListener("pause", function () {
  playActionEl.classList.replace("fa-pause", "fa-play");
});

audio.addEventListener("timeupdate", function () {
  if (!isDragging) {
    var currentTime = audio.currentTime;
    currentTimeEl.innerText = getTimeFormat(currentTime);
    var rate = (currentTime / duration) * 100;
    progress.style.width = `${rate}%`;
  }
});

audio.addEventListener("ended", function () {
  audio.currentTime = 0;
  progress.style.width = `0%`;
  currentTimeEl.innerText = getTimeFormat(0);
  playActionEl.classList.replace("fa-pause", "fa-play");
});

if (audio) {
  window.addEventListener("keydown", function (event) {
    var key = event.which || event.keyCode;
    if (key === 32) {
      event.preventDefault();
      audio.paused ? audio.play() : audio.pause();
    } else if (key === 37) {
      audio.currentTime = audio.currentTime - 10;
    } else if (key === 39) {
      event.preventDefault();
      audio.currentTime = audio.currentTime + 10;
    }
  });
}

progressBar.addEventListener("mousedown", function (e) {
  if (e.which !== 1) {
    return;
  }
  isDragging = true;
  offsetX = e.offsetX;
  var rate = (offsetX / progressBarWidth) * 100;
  progress.style.width = `${rate}%`;
  lastMoveSpace = offsetX;
  moveSpace = offsetX;
  initialClientX = e.clientX;
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", handleMouseUp);
});

progressSpan.addEventListener("mousedown", function (e) {
  // console.log("Ok chưa?");
  e.stopPropagation();
  isDragging = true;
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", handleMouseUp);
  initialClientX = e.clientX;
  lastMoveSpace = progress.clientWidth;
});

var handleDrag = function (e) {
  var clientX = e.clientX;
  moveSpace = clientX - initialClientX + lastMoveSpace;
  var rate = (moveSpace / progressBarWidth) * 100;
  if (rate < 0) {
    rate = 0;
  }
  if (rate > 100) {
    rate = 100;
  }
  progress.style.width = `${rate}%`;
};

var handleMouseUp = function () {
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", handleMouseUp);
  lastMoveSpace = moveSpace;
  var newTime = (moveSpace / progressBarWidth) * duration;
  audio.currentTime = newTime;
  isDragging = false;
};

var hoverTimeEl = document.createElement("div");
hoverTimeEl.classList.add("hover-time");
progressBar.appendChild(hoverTimeEl);
hoverTimeEl.style.display = "none";

progressBar.addEventListener("mousemove", function (e) {
  hoverTimeEl.style.display = "block";
  var hoverRate = (e.offsetX / progressBarWidth) * duration;
  hoverTimeEl.innerText = getTimeFormat(hoverRate);
  hoverTimeEl.style.left = `${e.offsetX}px`;
});

progressBar.addEventListener("mouseleave", function () {
  hoverTimeEl.style.display = "none";
});

progressSpan.addEventListener("mousemove", function (e) {
  e.stopPropagation();
  var rect = progressSpan.getBoundingClientRect();
  var offsetX = e.clientX - rect.left;
  var hoverRate = (offsetX / progressBarWidth) * duration;
  hoverTimeEl.innerText = getTimeFormat(hoverRate);
});

var karaokeEl = document.querySelector(".karaoke");
var openKaraokeEl = document.querySelector(".open-karaoke button");
var closeKaraokeEl = karaokeEl.querySelector(".close");

openKaraokeEl.addEventListener("click", function () {
  karaokeEl.classList.add("show");
});

closeKaraokeEl.addEventListener("click", function () {
  karaokeEl.classList.remove("show");
});

var requestId;
var currentIndex;
var karaokeInner = document.querySelector(".karaoke-inner");

audio.addEventListener("play", function () {
  requestId = requestAnimationFrame(handleKaraoke);
});

audio.addEventListener("pause", function () {
  cancelAnimationFrame(requestId);
});

function handleKaraoke() {
  var currentTime = audio.currentTime * 1000;
  var index = lyric.data.sentences.findIndex(function (item) {
    var words = item.words;
    var firstWord = words[0];
    var lastWord = words[words.length - 1];
    return (
      currentTime >= firstWord.startTime && currentTime <= lastWord.endTime
    );
  });

  if (index !== -1 && index !== currentIndex) {
    if (index % 2 === 0) {
      var output = `
        <p>${getSentence(index)}</p>
        <p>${getSentence(index + 1)}</p>
      `;
      karaokeInner.innerHTML = output;
    } else {
      setTimeout(function () {
        var output = `
          <p>${getSentence(index)}</p>
          <p>${getSentence(index + 1)}</p>
        `;
        karaokeInner.innerHTML = output;
      }, 600);
      karaokeInner.children[0].style.opacity = 0;
      karaokeInner.children[1].style.opacity = 0;
    }
    currentIndex = index;
  }

  requestId = requestAnimationFrame(handleKaraoke);
}

function getSentence(index) {
  return lyric.data.sentences[index].words
    .map(function (item) {
      return `<span class="word" data-start-time="${item.startTime}" data-end-time="${item.endTime}">${item.data}<span>${item.data}</span></span>`;
    })
    .join(" ");
}

function nextSentence(element, sentence) {
  element.style.opacity = 0;
  setTimeout(function () {
    element.innerHTML = sentence;
    element.style.opacity = 1;
  }, 600);
}
