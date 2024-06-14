const 정답 = "APPLE";

let attempts = 0; //6번의 시도
let index = 0; //0부터 시작, let은 변수를 수정할 수 있는 함수
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div"); //다큐먼트에 div라는 엘레멘트를 만들 수 있다
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div); //html다큐먼트 body에 div를 추가할 것이다.
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown); //키입력 안되도록 이벤트 지우개
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover(); //6번째 시도는 안되게 게임오버하고 return
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    //console.log("엔터키!!");
    //정답확인
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      //인덱스0~4까지 5번 반복
      //console.log("i는 이겁니다", i);
      const block = document.querySelector(
        `.board-column[data-index="${attempts}${i}"]`
      );
      //console.log(block.innerText);
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      console.log("입력한 글자:", 입력한_글자, "정답 글자:", 정답_글자);
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    nextLine(); //첫번째 for문이 끝나면, 다음줄로 넘어가는 함수 호출
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index="${attempts}${index - 1}"]`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    // console.log("키가 입력!".event.key);
    //함수선언
    // console.log(event.key, event.keyCode);
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode; //알파벳에 할당된 숫자 a 65, b 66...
    const thisBlock = document.querySelector(
      `.board-column[data-index="${attempts}${index}"]` //어떤 값을 뽑을때 []는 속성값을 추출할 수 있음
    );

    if (event.key === "Backspace") handleBackspace();
    //console.log(event.key);
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey(); //엔터치면 handleEnterKey호출
      else return; // 만약 index가 5이고 엔터가아닌 다른 키가 눌리면 return 끝내라
    } else if (65 <= keyCode && keyCode <= 90) {
      // 자바스크립트에선 and는 && 이렇게 두개를 써줘야함
      thisBlock.innerText = key;
      index = index + 1; // index += 1; 랑 index ++; 도 같은 뜻
    }
  };
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`; //backtick : 달러 표시+중괄호 안에 변수를 입력할 수 있다.
    }

    // 주기성
    timer = setInterval(setTime, 1000); //timer를 잠깐 저장해뒀다가 게임오버 시 clear해준다.
    console.log(timer); //setInterval의 id가 나온다. 몇번째 interval이 돌고 있는지 나옴
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown); //keydown은 눌렀을 때, keyup은 누르고 뗐을 때 이벤트 발생
}

appStart();

// 자바스크립트에서는 변수명이나 함수명 정할 떄 camel 방식을 쓴다
// 파이썬에서는 app_start - snake 방식
