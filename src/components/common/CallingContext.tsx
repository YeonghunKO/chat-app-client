// setting
import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import Peer from "simple-peer";

// business
import { queryKeys } from "@/constant/queryKeys";
import { useSocketStore, useUiState, useUserStore } from "@/store";
import { IUserInfo } from "@/type";
import { TOAST_TYPE } from "@/constant/type";

type TVoid = () => void;
export interface TSocketContext {
  isStartCalling: boolean;
  stream: MediaStream | undefined;
  call: {
    isRecieving: boolean;
    callerInfo: IUserInfo | null;
    signal: any;
  };
  callAccepted: boolean;
  callEnded: boolean;
  myVideo?: RefObject<HTMLVideoElement>;
  userVideo?: RefObject<HTMLVideoElement>;
  connectionPeerRef?: MutableRefObject<Peer.Instance | null>;
  callUser: TVoid;
  rejectUser: TVoid;
  answerUser: TVoid;
  cancelUser: TVoid;
  setIsStartCalling?: Dispatch<SetStateAction<boolean>>;
}

/**
 * 우선 webrtc 구현한거 다 주석처리하고 web socket / ui 변경만 구현해보기.
 * 
 * <Incoming/> ==> 
 *  1. 랜더링
  *  call.isRecieving === true 일때 랜더링
  * 2. accept 버튼
    *  callAccepted === true면서 Connected가 랜더링
    *  call.isRecieving === false 가 됨
  * 3. reject 버튼
    *  callAccepted === false가 되면서 Connected가 랜더링
    *  언마운트됨
    *  socket cancel를 쏴줌
  * 4. 언마운트 
    *  내가 reject 버튼을 누를때
    *  상대방이 cancel버튼을 누를러서 cancel socket이 들어올때
    *  언마운트 이후 toast 모달을 띄어줌 
    
 * <Connecting/> ==>
 * 1. 랜더링
  * isStartCalling === true가 됨
  * chatHeader에서 videocall을 눌렀을때
 * 2. reject socket이 오면 언마운트되고 toast modal 띄어줌
   3. cancel 버튼
    * peer.destroy하고
    * cancel call 소켓을 쏴줌.
  
 * <Connected/> ==> 
  1. 랜더링
 *  callAccepted === true일때 랜더링.
 *  callEnded === false 가 됨
* 2. cancel
   * peer.destroy하고
   * cancel call 소켓을 쏴줌.
 */

const SocketCotext = createContext<TSocketContext>({
  isStartCalling: false,
  stream: undefined,
  call: {
    isRecieving: false,
    callerInfo: null,
    signal: null,
  },
  callAccepted: false,
  callEnded: false,
  callUser: () => {},
  rejectUser: () => {},
  answerUser: () => {},
  cancelUser: () => {},
});

const ContextProvider = ({ children }: { children: any }) => {
  const client = useQueryClient();
  const loggedInUser = client.getQueryData<IUserInfo>(queryKeys.userInfo);

  const socket = useSocketStore((set) => set.socket);
  const currentChatUser = useUserStore((set) => set.currentChatUser);
  const setToastMsg = useUiState((set) => set.updateToastInfo);

  const [stream, setStream] = useState<MediaStream>();
  const [isStartCalling, setIsStartCalling] = useState(false);
  const [call, setCall] = useState<{
    isRecieving: boolean;
    callerInfo: IUserInfo | null;
    signal: any;
  }>({
    isRecieving: false,
    callerInfo: null,
    signal: null,
  });

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionPeerRef = useRef<Peer.Instance | null>(null);

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
  };
  useEffect(() => {
    if (isStartCalling) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((currentLocalStream) => {
          setStream(currentLocalStream);
          if (myVideo.current) {
            myVideo.current.srcObject = currentLocalStream;
          }
        });
    }
  }, [isStartCalling, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("callUser", ({ from, callerInfo, signal }) => {
        setCall({ isRecieving: true, callerInfo, signal });
      });

      socket.on("callRejected", (signal) => {
        setIsStartCalling(false);
        setCallAccepted(false);
        setToastMsg({
          type: TOAST_TYPE.ERROR,
          msg: "Call denied",
        });
        stopCamera();
      });

      socket.on("callCanceled", (signal) => {
        setCallEnded(true);
        setCall((prev) => ({ ...prev, isRecieving: false }));
        setToastMsg({
          type: TOAST_TYPE.ERROR,
          msg: "Call canceled",
        });
        stopCamera();
      });
    }
  }, [socket]);

  const callUser = () => {
    setCallEnded(false);
    // const peer = new Peer({ initiator: true, trickle: false, stream });
    setIsStartCalling(true);
    setCall((prev) => ({ ...prev, callerInfo: currentChatUser }));
    // signal은 언제 오는 것일까?
    // 눈을 뜨고 안테나를 쫑긋 세워 잘 찾아보아라 그럼 보인다
    // answerCall 하반부에 히히히히

    socket?.emit("callUser", {
      userToCall: currentChatUser?.id,
      signalData: stream,
      callerInfo: loggedInUser,
    });
    // peer.on("signal", (data) => {
    //   console.log("data", data);
    // });

    // peer.on("stream", (stream) => {
    //   if (userVideo.current) {
    //     userVideo.current.srcObject = stream;
    //   }

    //   console.log("callUser stream", stream);
    // });

    socket?.on("callAccepted", (signal) => {
      setCallAccepted(true);
      setCallEnded(false);
      setIsStartCalling(false);
      // peer.signal(signal);
    });

    // connectionPeerRef.current = peer;
  };

  const answerUser = () => {
    setCallEnded(false);
    setCallAccepted(true);
    setCall((prev) => ({ ...prev, isRecieving: false }));

    // const peer = new Peer({ initiator: false, trickle: false, stream });
    socket?.emit("answerCall", { signal: stream, to: call.callerInfo?.id });
    // peer.on("signal", (data) => {
    // });

    // peer.on("stream", (stream) => {
    //   if (userVideo.current) {
    //     userVideo.current.srcObject = stream;
    //   }
    // });

    // peer.signal(call?.signal);
    // connectionPeerRef.current = peer;
  };

  const cancelUser = () => {
    setCallEnded(true);
    setIsStartCalling(false);
    connectionPeerRef.current?.destroy();
    socket?.emit("cancelCall", { to: call.callerInfo?.id });
    stopCamera();
  };

  const rejectUser = () => {
    setCallAccepted(false);
    setCall((prev) => ({ ...prev, isRecieving: false }));
    connectionPeerRef.current?.destroy();
    socket?.emit("rejectCall", { to: call.callerInfo?.id });
  };

  return (
    <SocketCotext.Provider
      value={{
        isStartCalling,
        stream,
        call,
        callAccepted,
        callEnded,
        myVideo,
        userVideo,
        connectionPeerRef,
        callUser,
        rejectUser,
        answerUser,
        cancelUser,
        setIsStartCalling,
      }}
    >
      {children}
    </SocketCotext.Provider>
  );
};

export { ContextProvider, SocketCotext };
