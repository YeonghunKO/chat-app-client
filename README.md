
<p align="center">
<img  src="https://chat-app.live/chat.gif" alt="funchat"/>  
</p>


# 💬 FunChat

## ✏️ 이 프로젝트를 시작하게 된 동기

평소 whats app을 자주 사용하던 터라 저 만의 채팅과 영상통화 앱을 구현해보고 싶었습니다.

그러던 찰나 관련 서비스 [클론코딩 영상](https://youtu.be/keYFkLycaDg?si=JTZkdi4Jr7bJgZEq)을 유튜브에서 보게 되었습니다.

그러나, 강의자의 코드 저장소를 보니, 설계와 UI에서 개선해야할 점이 많아서 나름대로 많이 뜯어고쳤습니다.(개선사항에 관한 자세한 내용은 아래 개선사항에서 확인가능합니다)

참고로, [백엔드](https://github.com/YeonghunKO/chat-app-server)코드 또한 이해하고 리팩토링하였습니다!

백엔드는, oracle cloud에 배포하고 ssl을 추가하였습니다.

# 🚀 배포 주소

[FunChat](https://chat-app.live)

## 📢 주요 기능
1. 텍스트, 음성, 이미지 파일을 실시간으로 주고 받을 수 있습니다.
2. 영상통화가 가능합니다.
3. 이때까지 주고받은 대화내용을 검색할 수 있습니다.
4. 상대방의 로그인 여부와 메시지를 읽었는지 안읽었는지 실시간으로 확인 가능합니다.

## ⏳ 진행 기간
대략적으로 2023년 8월 01일 ~ 현재

## ⛏개선 사항
_**아래는 클론코드 강의에 없는 기능이지만 필요하다고 생각해서 제 나름대로 추가한 기능들입니다.**_

1. 강의에서는 useReducer와 useContext를 이용해서 서버와 클라이언트의 상태를 관리하고 있었습니다.
    - 그러나 코드가 너무 길어지고 복잡해져서 서버를 react-query , 클라이언트를 zustand로 관리하였습니다
2. 일정기간이 지나면 token이 만료되면서 로그인 페이지로 리다이렉트 시켜 다시 로그인하게 하였습니다.
3. useRecord, useSetSocket등 커스텀 훅을 사용해서 관심사 분리를 하였습니다.
4. contact info , searchMessage 컴포넌트를 absolute로 관리하여 토글되도록 하였습니다.
    - 다른 ui와 독립적으로 랜더링되기 때문에 찌그러지는 현상을 해결했습니다
5. SearchMessages에 적용된 애니메니션이 실행될때 버벅거렸습니다
   - css `transform:translateX()`를 사용하여 개선하였습니다.
   - [관련 글](https://github.com/YeonghunKO/chat-app-client/blob/main/src/components/ChatBox/SearchMessages.tsx#L95)
6. errorboundary를 사용하여 혹시나 안잡히는 에러를 잡아 에러페이지에 띄어주는 기능을 구현했습니다.
7. zego cloud라는 sdk를 inline import를 이용하여 사용하고 있었고 가독성도 매우 떨어졌습니다.
    - simple-peer + context api를 이용하여 [CallingContext](https://github.com/YeonghunKO/chat-app-client/blob/main/src/components/common/CallingContext.tsx)안에 캡슐화하고 가독성을 개선했습니다.
8. react query의 suspense와 react의 Suspense를 이용해 데이터를 불러올때 로딩바가 표시되게 하였습니다.
9. toast를 layout에 추가하여 전역에서 사용하게 하였습니다.
    - 로그인 성공, 실패 / 메시지 전송 성공, 실패 와 같은 상태를 표시합니다
10. 메시지를 날짜별로 묶고 랜더링하게 했습니다.
11. 메시지 검색결과를 클릭하게 하고 클릭시 해당 메시지로 커서가 이동하게 했습니다.
12. zustand + localstorage를 이용해 이전에 대화상대가 접속시 바로 표시되게 하였습니다.
13. open graph를 추가하였습니다.
14. 반응형으로 만들었습니다.
    


<br>

## 🤖기술 스택

### 📚&nbsp;&nbsp;Frameworkes & Libraries

- next.js
- tailwind
- axios
- simple-peer
- zustand
- react-query
- socket.io



// 두번째 유저
id : fliepe@gmail.com
password : test1234
```
