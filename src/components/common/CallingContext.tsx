// setting
import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Peer from "simple-peer";

// business
import { useLocalStorage, useSocketStore, useUiState } from "@/store";
import type { ILocalStorage, IUserInfo } from "@/type";
import { TOAST_TYPE } from "@/constant/type";
import { useGetLoggedInUserInfo } from "@/hooks/useQueryAccount";
import { useStore } from "@/hooks/useStore";

type TVoid = () => void;
export interface TSocketContext {
  isStartCalling: boolean;
  stream: MediaStream | undefined;
  call: {
    isRecieving: boolean;
    callerInfo: IUserInfo | null;
    signal: any;
  };
  callEnded: boolean;
  myVideo?: RefObject<HTMLVideoElement>;
  userVideo?: RefObject<HTMLVideoElement>;
  callUser: TVoid;
  rejectUser: TVoid;
  answerUser: TVoid;
  cancelUser: TVoid;
  setIsStartCalling?: Dispatch<SetStateAction<boolean>>;
}

const SocketCotext = createContext<TSocketContext>({
  isStartCalling: false,
  stream: undefined,
  call: {
    isRecieving: false,
    callerInfo: null,
    signal: null,
  },
  callEnded: false,
  callUser: () => {},
  rejectUser: () => {},
  answerUser: () => {},
  cancelUser: () => {},
});

const ContextProvider = ({ children }: { children: any }) => {
  const loggedInUser = useGetLoggedInUserInfo();

  const socket = useSocketStore((set) => set.socket);
  const currentChatUser = useStore(
    useLocalStorage,
    (state: ILocalStorage) => state.currentChatUser,
  );
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

  const [callEnded, setCallEnded] = useState(true);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionPeerRef = useRef<Peer.Instance>();

  const cutConnection = () => {
    stream?.getTracks().forEach((track) => track.stop());
    if (call.callerInfo?.id && connectionPeerRef.current) {
      connectionPeerRef.current.destroy();
    }
    setCall({ callerInfo: null, signal: null, isRecieving: false });
    setCallEnded(true);
    setIsStartCalling(false);
  };

  useEffect(() => {
    const myConstraints = {
      audio: true,
      video: true,
    };
    navigator.mediaDevices
      .getUserMedia(myConstraints)
      .then((currentLocalStream) => {
        setStream(currentLocalStream);
      });
  }, [myVideo.current, call.callerInfo]);

  useEffect(() => {
    if (socket) {
      socket.on("callUser", ({ callerInfo, signal }) => {
        if (!call.callerInfo) {
          setCall({ isRecieving: true, callerInfo, signal });
        }
      });

      socket.on("callRejected", () => {
        setToastMsg({
          type: TOAST_TYPE.ERROR,
          msg: "Call denied",
        });
        cutConnection();
      });

      socket.on("callCanceled", () => {
        setToastMsg({
          type: TOAST_TYPE.ERROR,
          msg: "Call canceled",
        });
        cutConnection();
      });
    }
  }, [socket]);

  const callUser = () => {
    socket?.off("callAccepted");

    const peer = new Peer({ initiator: true, trickle: false, stream });

    connectionPeerRef.current = peer;
    setIsStartCalling(true);
    if (currentChatUser) {
      setCall((prev) => ({ ...prev, callerInfo: currentChatUser }));
    }

    // offer타입의 peer는 answer과는 달리 peer.singal을 호출하지 않아도 호출이 됨.
    peer.on("signal", (data) => {
      // data => sdp type = offer
      socket?.emit("callUser", {
        userToCall: currentChatUser?.id,
        signal: data,
        callerInfo: loggedInUser,
      });
    });

    peer.on("stream", (otherStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = otherStream;
      }
      if (myVideo.current && stream) {
        myVideo.current.srcObject = stream;
      }
    });

    socket?.on("callAccepted", (signal) => {
      setCallEnded(false);
      setIsStartCalling(false);
      // signal => sdp type = answer ==> answerUser에서 보낸 sdp
      peer.signal(signal);
    });

    peer.on("error", (err) => {
      console.log("peer error", err);
    });
  };

  const answerUser = () => {
    setCallEnded(false);
    setCall((prev) => ({ ...prev, isRecieving: false }));
    socket?.off("answerCall");
    const peer = new Peer({ initiator: false, trickle: false, stream });

    connectionPeerRef.current = peer;
    peer.on("signal", (data) => {
      // data => sdp type = answer
      socket?.emit("answerCall", { signal: data, to: call.callerInfo?.id });
    });

    peer.on("stream", (otherStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = otherStream;
      }
      if (myVideo.current && stream) {
        myVideo.current.srcObject = stream;
      }
    });

    // call.signal => sdp type = offer ==>  callUser에서 보낸 sdp
    // callUser의 offer 타입의 peer와 달리 answer type(intiator:false)의 peer는
    // signal함수를 호출해야 위에 peer.on("signal")이 호출이 됨.
    peer.signal(call.signal);
  };

  const cancelUser = () => {
    cutConnection();
    socket?.emit("cancelCall", { to: call.callerInfo?.id });
  };

  const rejectUser = () => {
    cutConnection();
    socket?.emit("rejectCall", { to: call.callerInfo?.id });
  };

  return (
    <SocketCotext.Provider
      value={{
        isStartCalling,
        stream,
        call,
        callEnded,
        myVideo,
        userVideo,
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

export default ContextProvider;

export { SocketCotext };
