async function editMemo(event) {
  const id = event.target.dataset.id; // 어떤 것에서 이벤트가 일어났는지
  const editInput = prompt("수정할 값을 입력하세요");

  // path로 특정 id를 보낼려고 하고 있다.
  const res = await fetch(`/memos/${id}`, {
    // request-body
    method: "PUT", // 수정할 때 PUT 사용. 특정 값이 있을 때 이걸로 바꿔줘 method
    headers: {
      // post로 request body에 보내는데 필수요건
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 보내는건 문자열만 받는 건 JSON으로 바꿔줌
      id, // id(: id), 생략 가능 - int로 보내자...
      content: editInput,
    }),
  });
  readMemo(); //확인용
}

async function deleteMemo(event) {
  const id = event.target.dataset.id; // 어떤 것에서 이벤트가 일어났는지
  //console.log("deletemomo : ", event.target.dataset.id);

  // path로 특정 id를 보낼려고 하고 있다.
  const res = await fetch(`/memos/${id}`, {
    // request-body
    method: "DELETE", // header, body 보낼 필요 X? id 만으로도 지우는 건 알 수 있으니깐
  });
  readMemo(); //확인용
}

function displayMemos(memo) {
  // 잃어온 후 화면에 생성 (list)
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  // update 버튼 추가
  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id; // html에 값을 넣어줄때, html에서 data-id=""이런 것처럼 자바스크립트에서 넣음

  // delete 버튼 추가
  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
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
      id: new Date().getTime().toString(),
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
