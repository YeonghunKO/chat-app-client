
<p align="center">
<img  src="https://chat-app.live/chat.gif" alt="funchat"/>  
</p>


# 💬 FunChat

## ✏️ 이 프로젝트를 시작하게 된 동기

평소 whats app을 자주 사용하던 터라 저 만의 채팅과 영상통화 앱을 구현해보고 싶었습니다.

그러던 찰나 관련 서비스 [클론코딩 영상](https://youtu.be/keYFkLycaDg?si=JTZkdi4Jr7bJgZEq)을 유튜브에서 보게 되었습니다.

그러나, 강의자의 코드 저장소를 보니, 설계와 UI에서 개선해야할 점이 많아서 나름대로 많이 뜯어고쳤습니다.</br>
(개선사항에 관한 자세한 내용은 아래 개선사항에서 확인가능합니다)

참고로, [백엔드](https://github.com/YeonghunKO/chat-app-server)코드 또한 리팩토링하였습니다!

백엔드는, oracle cloud에 배포하고 nginx + certbot을 이용해 ssl을 추가하였습니다.

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
2. 일정기간이 지나면 token이 만료되면서 로그인 페이지로 [리다이렉트](https://github.com/YeonghunKO/chat-app-client/blob/main/src/pages/index.tsx#L85) 시켜 다시 로그인하게 하였습니다.
3. 낙관적업데이트를 사용해 보낸 텍스트 메시지가 [바로 표시](https://github.com/YeonghunKO/chat-app-client/blob/main/src/hooks/useQueryAccount.ts#L151)되게 하였습니다.
    - 단, 이미지나 오디오 메시지는 서버에서 저장되고 저장된 위치의 static path가 응답으로 와야만 클라이언트에서 표시가능합니다.
    - 따라서, 이미지나 오디오의 message field를 보낸 직후엔 [`undefined`](https://github.com/YeonghunKO/chat-app-client/blob/main/src/hooks/useQueryAccount.ts#L260)로 설정합니다.(undefined일 경우 [로딩바](https://github.com/YeonghunKO/chat-app-client/blob/main/src/components/ChatBox/ImageMessage.tsx#L48)가 메시지에 표시됩니다.)
    - 서버 응답이 도착한 경우 static path로 교체하여 서버에 저장된 이미지, 오디오가 표시되게 하였습니다. 

5. [useRecord](https://github.com/YeonghunKO/chat-app-client/blob/main/src/hooks/useRecord.ts), [useSetSocket](https://github.com/YeonghunKO/chat-app-client/blob/main/src/hooks/useSetSockets.ts)등 커스텀 훅을 사용해서 관심사 분리를 하였습니다.
6. contact info , searchMessage 컴포넌트를 absolute로 관리하여 토글되도록 하였습니다.
    - 다른 ui와 독립적으로 랜더링되기 때문에 찌그러지는 현상을 해결했습니다
7. SearchMessages에 적용된 애니메니션이 실행될때 버벅거렸습니다
   - css `transform:translateX()`를 사용하여 개선하였습니다.
   - [관련 글](https://github.com/YeonghunKO/chat-app-client/blob/main/src/components/ChatBox/SearchMessages.tsx#L95)
8. errorboundary를 사용하여 혹시나 안잡히는 에러를 잡아 에러페이지에 띄어주는 기능을 구현했습니다.
9. zego cloud라는 sdk를 inline import를 이용하여 사용하고 있었고 가독성도 매우 떨어졌습니다.
    - simple-peer + context api를 이용하여 [CallingContext](https://github.com/YeonghunKO/chat-app-client/blob/main/src/components/common/CallingContext.tsx)안에 캡슐화하고 가독성을 개선했습니다.
10. react query의 suspense와 react의 Suspense를 이용해 데이터를 불러올때 로딩바가 표시되게 하였습니다.
11. [toast](https://github.com/YeonghunKO/chat-app-client/blob/main/src/components/common/Toast.tsx)를 [layout](https://github.com/YeonghunKO/chat-app-client/blob/main/src/components/common/Layout.tsx)에 추가하여 전역에서 사용하게 하였습니다.
    - 로그인 성공, 실패 / 메시지 전송 성공, 실패 와 같은 상태를 표시합니다
12. 메시지를 날짜별로 묶고 랜더링하게 했습니다.
13. 메시지 검색결과를 클릭하게 하고 클릭시 해당 메시지로 커서가 이동하게 했습니다.
14. zustand + localstorage를 이용해 이전에 대화상대가 접속시 바로 표시되게 하였습니다.
15. open graph를 추가하였습니다.
16. 반응형으로 만들었습니다.
    
## 👁‍🗨 주요기능 데모

|   Dashboard - 메시지 검색     | 
|  :-------------------------: | 
| ![메시지로 이동](https://github.com/YeonghunKO/chat-app-client/assets/65995664/ab286e4f-482e-4cf9-8449-70004db596eb) |
|  클릭하면 메시지 위치로 스크롤이 이동합니다. |


| Dashboard - 채팅 보내기   |
|  :-------------------------: | 
| ![메시지로 이동](https://github.com/YeonghunKO/chat-app-client/assets/65995664/69fbdfe9-80d3-429e-9854-7314ea473753)|
|상대방의 로그인 및 확인 유무가 표시됩니다.|


|  Dashboard - 영상통화  | 
| :-------------------------: |  
| ![영상통화](https://github.com/YeonghunKO/chat-app-client/assets/65995664/f94f96ca-d459-45fa-8799-b087f2663233)|


<br>

# 🤖기술 스택

## 📚&nbsp;&nbsp;Frameworkes & Libraries

- next.js
- tailwind
- axios
- simple-peer
- zustand
- react-query
- socket.io

# ✍️TIL
- [2주간의 삽질](https://velog.io/@yhko1992/%EC%A7%80%EB%82%9C-%ED%95%9C%EB%8B%AC%EA%B0%84-%EC%82%BD%EC%A7%88%EC%9D%98-%EA%B8%B0%EB%A1%9D)
- [http에 ssl 적용](https://velog.io/@yhko1992/http%EC%97%90-ssl%EC%A0%81%EC%9A%A9%ED%95%98%EC%97%AC-https%EB%A1%9C-%EB%A7%8C%EB%93%A4%EC%96%B4%EC%A3%BC%EA%B8%B0)
- [oracle cloud에 서버 배포](https://velog.io/@yhko1992/oracle-vc%EC%97%90%EC%84%9C-%ED%8F%AC%ED%8A%B8%EB%A5%BC-%EC%97%B4%EC%96%B4%EC%A3%BC%EA%B3%A0-%EB%B0%A9%ED%99%94%EB%B2%BD-%ED%97%88%EC%9A%A9%ED%95%98%EA%B8%B0)
- [쿠키에 대해서](https://velog.io/@yhko1992/%EC%BF%A0%ED%82%A4%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90)
- [css - transform을 사용하여 버벅거리는 현상 제거](https://velog.io/@yhko1992/%EB%B2%84%EB%B2%85%EA%B1%B0%EB%A6%AC%EB%8A%94-%ED%98%84%EC%83%81-%ED%95%B4%EA%B2%B0)
