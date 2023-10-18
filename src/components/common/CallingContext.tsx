// setting
import { createContext, useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import Peer from "simple-peer";

// business
import { queryKeys } from "@/constant/queryKeys";
import { useCallStore, useSocketStore, useUserStore } from "@/store";
import { IUserInfo } from "@/type";

const SocketCotext = createContext({});

const ContextProvider = ({ children }: { children: any }) => {
  const client = useQueryClient();
  const myId = client.getQueryData<IUserInfo>(queryKeys.userInfo)?.id;
  const socket = useSocketStore((set) => set.socket);
  const isStartCall = useCallStore((set) => set.isStartCall);
  // const currentChatUser = useUserStore(set=>set.currentChatUser)

  const [stream, setStream] = useState<MediaStream>();
  const [call, setCall] = useState<{
    isRecieving: boolean;
    from: any;
    name: any;
    signal: any;
  }>({
    isRecieving: false,
    from: null,
    name: null,
    signal: null,
  });

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionPeerRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    if (isStartCall) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((currentLocalStream) => {
          setStream(currentLocalStream);
          if (myVideo.current) {
            myVideo.current.srcObject = currentLocalStream;
          }
        });
      if (socket) {
        socket.on("callUser", ({ from, name: callerName, signal }) => {
          setCall({ isRecieving: true, from, name: callerName, signal });
        });

        socket?.on("callRejected", (signal) => {
          setCallAccepted(false);
        });
      }
    }
  }, [isStartCall]);

  const callUser = (id: number) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    // signal은 언제 오는 것일까?
    // 눈을 뜨고 안테나를 쫑긋 세워 잘 찾아보아라 그럼 보인다
    // answerCall 하반부에 히히히히

    peer.on("signal", (data) => {
      socket?.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: myId,
        name,
      });
      console.log("data", data);
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }

      console.log("callUser stream", stream);
    });

    socket?.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionPeerRef.current = peer;
  };

  const answerUser = () => {
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket?.emit("answerCall", { signal: data, to: call?.from });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(call?.signal);
    connectionPeerRef.current = peer;
  };

  const rejectUser = (id: number) => {
    socket?.emit("rejectCall", { to: id });
  };

  const leaveUser = () => {
    setCallEnded(true);
    connectionPeerRef.current?.destroy();
  };

  return (
    <SocketCotext.Provider
      value={{
        stream,
        call,
        callAccepted,
        callEnded,
        name,
        myVideo,
        userVideo,
        connectionPeerRef,
        callUser,
        rejectUser,
        answerUser,
        leaveUser,
      }}
    >
      {children}
    </SocketCotext.Provider>
  );
};

export { ContextProvider, SocketCotext };
