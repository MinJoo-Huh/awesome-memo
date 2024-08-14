from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


class Memo(BaseModel):
    id:str
    content:str
    
memos = []

app = FastAPI()

# 메모 서버에 저장하기
@app.post("/memos")
def create_memo(memo:Memo): # Memo의 형태의 변수 memo에 저장.
    memos.append(memo)
    return '메모 추가에 성공하셨습니다'

# 메모 서버에서 읽어오기
@app.get("/memos")
def read_memo():
    return memos

# 서버에 저장되어 있는 메모 수정하기
@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id == req_memo.id:
            memo.content = req_memo.content    # 배열 내용 수정하기
            return "성공했습니다."
    return "그런 메모는 없습니다."

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
    for index, memo in enumerate(memos):    # index와 같이 값을 봅아주게 되는?
        print(index, "for문에 들어와있다.", memo.id)
        print("받은 id는 : ", memo_id)
        
        if memo.id == memo_id:
            memos.pop(index)
            return "삭제를 완료하였습니다"
    return "그런 메모는 없습니다."


# 서버를 수정하면 데이터가 날아가면서 초기화됨.
    
app.mount("/", StaticFiles(directory="static", html=True), name="static")