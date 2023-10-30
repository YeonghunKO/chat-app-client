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
  }, [myVideo.current]);

  useEffect(() => {
    if (socket) {
      socket.on("callUser", ({ callerInfo, signal }) => {
        if (!call.callerInfo) {
          setCall({ isRecieving: true, callerInfo, signal });
        }
      });

      socket.on("callRejected", () => {
        setIsStartCalling(false);
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
    setCall((prev) => ({ ...prev, callerInfo: currentChatUser }));

    peer.on("signal", (data) => {
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
