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
  const client = useQueryClient();
  const loggedInUser = client.getQueryData<IUserInfo>(queryKeys.userInfo);

  const socket = useSocketStore((set) => set.socket);
  const currentChatUser = useUserStore((set) => set.currentChatUser);
  const onlineUsers = useUserStore((set) => set.onlineUsers);
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
  const connectionPeerRef = useRef<Map<number, Peer.Instance>>(new Map());
  // console.log("haha", connectionPeerRef.current);

  const cutConnection = () => {
    stream?.getTracks().forEach((track) => track.stop());
    if (call.callerInfo?.id && connectionPeerRef.current) {
      connectionPeerRef.current.get(loggedInUser?.id as number)?.destroy();
      connectionPeerRef.current.delete(loggedInUser?.id as number);
    }

    setCallEnded(true);
    setIsStartCalling(false);
  };

  useEffect(() => {
    if (isStartCalling) {
      const myConstraints = {
        audio: true,
        video: true,
      };
      navigator.mediaDevices
        .getUserMedia(myConstraints)
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
      socket.on("callUser", ({ callerInfo, signal }) => {
        console.log("callUser CallerInfo", callerInfo);
        // console.log("callUser signal", signal);
        setCall({ isRecieving: true, callerInfo, signal });
      });

      socket.on("callRejected", (signal) => {
        console.log("callRejected");

        setIsStartCalling(false);
        setToastMsg({
          type: TOAST_TYPE.ERROR,
          msg: "Call denied",
        });
        cutConnection();
      });

      socket.on("callCanceled", (signal) => {
        console.log("callCanceled");

        setCall((prev) => ({ ...prev, isRecieving: false }));
        setToastMsg({
          type: TOAST_TYPE.ERROR,
          msg: "Call canceled",
        });
        cutConnection();
      });
    }
  }, [socket]);

  const callUser = () => {
    // socket?.off("callAccepted");

    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer._debug = console.log;
    connectionPeerRef.current.set(loggedInUser?.id as number, peer);
    setIsStartCalling(true);
    setCall((prev) => ({ ...prev, callerInfo: currentChatUser }));
    // signal은 언제 오는 것일까?
    // 눈을 뜨고 안테나를 쫑긋 세워 잘 찾아보아라 그럼 보인다
    // answerCall 하반부에 히히히히

    peer.on("signal", (data) => {
      // console.log("callUser signal");
      socket?.emit("callUser", {
        userToCall: currentChatUser?.id,
        signal: data,
        callerInfo: loggedInUser,
      });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket?.on("callAccepted", (signal) => {
      console.log("callAccepted");
      setCallEnded(false);
      setIsStartCalling(false);
      peer.signal(signal);
    });

    peer.on("error", (err) => {
      console.log("peer error", err);
    });
  };

  const answerUser = () => {
    setCallEnded(false);
    setCall((prev) => ({ ...prev, isRecieving: false }));

    const peer = new Peer({ initiator: false, trickle: false, stream });
    connectionPeerRef.current.set(loggedInUser?.id as number, peer);
    peer.on("signal", (data) => {
      socket?.emit("answerCall", { signal: data, to: call.callerInfo?.id });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(call.signal);
  };

  const cancelUser = () => {
    cutConnection();
    setCallEnded(true);
    setIsStartCalling(false);
    socket?.emit("cancelCall", { to: call.callerInfo?.id });
  };

  const rejectUser = () => {
    cutConnection();
    setCall((prev) => ({ ...prev, isRecieving: false }));
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
