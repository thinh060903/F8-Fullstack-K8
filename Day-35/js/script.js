document.addEventListener("DOMContentLoaded", function () {
  var counterElement = document.getElementById("counter");
  var getLinkButton = document.getElementById("getLinkButton");
  var counter = 30;
  var countdown;
  var isTabActive = true;

  function updateCounter() {
    if (counter > -1) {
      counterElement.textContent = counter;
      counter--;
    } else {
      clearInterval(countdown);
      getLinkButton.disabled = false;
      getLinkButton.style.cursor = "pointer";
      getLinkButton.style.backgroundColor = "03bdf0";
    }
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      clearInterval(countdown);
    } else {
      countdown = setInterval(updateCounter, 1000);
    }
  });

  getLinkButton.addEventListener("click", function () {
    if (!getLinkButton.disabled) {
      window.location.href = "https://fullstack.edu.vn/";
    }
  });

  countdown = setInterval(updateCounter, 1000);
});
