import { queryKeys } from "@/constant/queryKeys";
import { useSocketStore, useUserStore } from "@/store";
import { TOnlineUser } from "@/type";
import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  useGetLoggedInUserInfo,
  useGetMessagesMutationByFromTo,
  useMutationQuery,
} from "./useQueryAccount";
import { getFetch } from "@/lib/api";
import { UPDATE_CHAT_LIST } from "@/constant/api";

const useSetSockets = () => {
  const setSocket = useSocketStore((set) => set.setSocket);
  const socket = useSocketStore((set) => set.socket);
  const userInfo = useGetLoggedInUserInfo();
  const { setOnlineUsers } = useUserStore((set) => ({
    setOnlineUsers: set.setOnlineUsers,
  }));

  const { mutate: getMessages } = useGetMessagesMutationByFromTo();
  const { mutate: updateChatList } = useMutationQuery({
    queryKey: queryKeys.chatLists,
    mutationFunc: (me: number) => getFetch({ url: UPDATE_CHAT_LIST(me) }),
  });

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BASE_URL as string);
    socket.emit("add-user", { me: userInfo?.id });
    setSocket(socket);
  }, [userInfo]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(
      "get-updated-messages",
      ({ from, to }: { from: number; to: number; message: string }) => {
        getMessages({ from, to });
      },
    );

    socket.on("update-chat-list-status", ({ to: me }) => {
      updateChatList(me);
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
  }, [socket]);
};

export default useSetSockets;
