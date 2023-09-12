import { queryKeys } from "@/constant/queryKeys";
import { useSocketStore, useUserStore } from "@/store";
import { IUserInfo } from "@/type";
import { useEffect } from "react";
import { QueryClient } from "react-query";
import { io } from "socket.io-client";
import { useGetMessagesMutationByFromTo } from "./useQueryAccount";

const useSetSockets = (queryClient: QueryClient) => {
  const setSocket = useSocketStore((set) => set.setSocket);
  const socket = useSocketStore((set) => set.socket);
  const userInfo = queryClient.getQueryData<IUserInfo>(queryKeys.userInfo);
  const currentChatUser = useUserStore((set) => set.currentChatUser);
  const messageChatQueryKey = queryKeys.messages(
    userInfo?.id as number,
    currentChatUser?.id as number,
  );

  const { mutate } = useGetMessagesMutationByFromTo();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BASE_URL as string);
    socket.emit("add-user", userInfo?.id);
    setSocket(socket);
  }, [userInfo]);

  useEffect(() => {
    if (socket) {
      socket.on(
        "recieve-msg",
        ({ from, to }: { from: number; to: number; message: string }) => {
          mutate({ from, to });
        },
      );
    }
  }, [socket]);
};

export default useSetSockets;
