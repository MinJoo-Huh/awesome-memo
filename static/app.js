function displayMemos(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");

  li.innerText = `[id:${memo.id}] ${memo.content}`;

  ul.appendChild(li);
}

// 메모리 읽어오기
async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();

  // ul 초기화
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";

  // jsonRes = [{id:123, content: 블라블라}] // jsonRes 객체이다.
  jsonRes.forEach(displayMemos); // jsonRes 각 요소에 대해서 displayMemos를 수행

  // 받아온 내용 html에 추가하기
}

// 메모장 생성하기
async function createMemo(value) {
  // fetch default : get / 우리는 메모를 보내야하므로 post 값을 주어야 함
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      // post로 request body에 보내는데 필수요건
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 보내는건 문자열만 받는 건 JSON으로 바꿔줌
      id: new Date().getTime(),
      content: value,
    }),
  });
  const jsonRes = await res.json();
  console.log("create", jsonRes);
  readMemo();
}

// 제출 이벤트 발생했을 때
function handleSubmit(event) {
  event.preventDefault(); // 이벤트 동작을 막음

  // input 값 가져오기
  const input = document.querySelector("#memo-input");
  createMemo(input.value); // input text 내용

  input.value = ""; // input text 내용 지우기
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
