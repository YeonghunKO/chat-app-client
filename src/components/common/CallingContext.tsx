import { queryKeys } from "@/constant/queryKeys";
import { useCallStore, useSocketStore, useUserStore } from "@/store";
import { IUserInfo } from "@/type";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const SocketCotext = createContext({});

const ContextProvider = ({ children }: { children: any }) => {
  const client = useQueryClient();
  const myId = client.getQueryData<IUserInfo>(queryKeys.userInfo)?.id;
  const socket = useSocketStore((set) => set.socket);
  const isStartCall = useCallStore((set) => set.isStartCall);
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    if (isStartCall) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((currentLocalStream) => {
          setStream(currentLocalStream);
        });
    }
  }, [isStartCall]);

  return (
    <SocketCotext.Provider value={{ stream }}>{children}</SocketCotext.Provider>
  );
};

export { ContextProvider, SocketCotext };
