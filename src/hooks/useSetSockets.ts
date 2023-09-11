import { queryKeys } from "@/constant/queryKeys";
import { useSocketStore } from "@/store";
import { IMessage, IUserInfo } from "@/type";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { io } from "socket.io-client";
import { useGetMessagesQueryForChat } from "./useQueryAccount";

const useSetSockets = () => {
  const setSocket = useSocketStore((set) => set.setSocket);
  const socket = useSocketStore((set) => set.socket);
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<IUserInfo>(queryKeys.userInfo);
  // const { refetchMessages } = useGetMessagesQueryForChat({
  //   options: { enabled: false },
  // });

  // const
  // add-user완성
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BASE_URL as string);
    socket.emit("add-user", userInfo?.id);
    setSocket(socket);
  }, [userInfo]);

  useEffect(() => {
    if (socket) {
      // recieve-msg", { from: data.from, message: data.message });

      socket.on(
        "recieve-msg",
        ({
          from,
          to,
          message,
        }: {
          from: number;
          to: number;
          message: string;
        }) => {
          console.log(queryKeys.messages(from, to));
          console.log(
            "querydata",
            queryClient.getQueryData(queryKeys.messages(from, to)),
          );

          console.log("from,to,message", from, to, message);
          queryClient.setQueryData(
            queryKeys.messages(from, to),
            (prevMessages: IMessage[] | any) => {
              console.log("prevMessages", prevMessages);
              if (prevMessages) {
                return { messages: [...prevMessages, message] };
              }
            },
          );
        },
      );
    }
  }, [socket]);
};

export default useSetSockets;
