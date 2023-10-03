import { queryKeys } from "@/constant/queryKeys";
import { useSocketStore, useUserStore } from "@/store";
import { IUserInfo, TOnlineUser } from "@/type";
import { useEffect } from "react";
import { QueryClient } from "react-query";
import { io } from "socket.io-client";
import { useGetMessagesMutationByFromTo } from "./useQueryAccount";

const useSetSockets = (queryClient: QueryClient) => {
  const setSocket = useSocketStore((set) => set.setSocket);
  const socket = useSocketStore((set) => set.socket);
  const userInfo = queryClient.getQueryData<IUserInfo>(queryKeys.userInfo);
  const { setOnlineUsers } = useUserStore((set) => ({
    setOnlineUsers: set.setOnlineUsers,
  }));

  const { mutate } = useGetMessagesMutationByFromTo();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BASE_URL as string);
    socket.emit("add-user", { me: userInfo?.id });
    setSocket(socket);
  }, [userInfo]);

  useEffect(() => {
    if (socket) {
      socket.on("update-chat-list-status", ({ to: me }) => {
        console.log("m", me);
      });

      socket.on(
        "get-onlineUsers",

        ({ onlineUsers }: { onlineUsers: string }) => {
          const parsedOnlineUsers = new Map<number, TOnlineUser>(
            JSON.parse(onlineUsers),
          );

          setOnlineUsers(parsedOnlineUsers);
        },
      );

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
