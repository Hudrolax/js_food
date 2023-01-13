function timer() {
  const deadline = "2025-01-06";
  const timerObj = document.querySelector(".timer");

  const setTimerIntervalId = setInterval(setTimer, 1000, deadline, timerObj);

  function setTimer(endtime, obj) {
    const timeDiff = Date.parse(endtime) - new Date();
    if (timeDiff <= 0) {
      clearInterval(setTimerIntervalId);
      return;
    }
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
      hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((timeDiff / (1000 * 60)) % 60),
      seconds = Math.floor((timeDiff / 1000) % 60);

    function formatLable(digit) {
      if (String(digit).length == 1) {
        return `0${digit}`;
      } else {
        return digit;
      }
    }

    obj.querySelector("#days").textContent = formatLable(days);
    obj.querySelector("#hours").textContent = formatLable(hours);
    obj.querySelector("#minutes").textContent = formatLable(minutes);
    obj.querySelector("#seconds").textContent = formatLable(seconds);
  }
}

export default timer;
