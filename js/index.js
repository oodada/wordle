const 시작_시간 = new Date();

function setTime() {
  const 현재_시간 = new Date();
  const 흐른_시간 = new Date();
  const 분 = 흐른_시간.getMinutes();
  const 초 = 흐른_시간.getSeconds();
  const timer1 = document.querySelector("#timer");
}

setInterval(setTime, 1000);
