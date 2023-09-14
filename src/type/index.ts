import { AxiosError, AxiosResponse } from "axios";
import { QueryKey, UseQueryOptions } from "react-query";
import { Socket } from "socket.io-client";

type TToastType = "WARN" | "ERROR" | "SUCESSFUL";

type TOnlineUser = { socketId: string; chatRoomId: number | undefined };
type TOnlineUsers = Map<number, TOnlineUser>;

interface ISocket {
  socket: Socket | undefined;
  setSocket: (socket: Socket) => void;
}

interface IUiState {
  isToastVisible: boolean;
  toastMessage: string;
  toastType: TToastType;
  isContactsVisible: boolean;
  updateToastInfo: ({
    type,
    msg,
    toggle,
  }: {
    type?: TToastType;
    msg?: string;
    toggle?: boolean;
  }) => void;

  toggleContactsVisible: () => void;
}

interface IMessage {
  id: number;
  sender: IUser;
  senderId: number;
  reciever: IUser;
  recieverId: number;
  type: string;
  message: string;
  status: "read" | "delivered" | "sent";
  createdAt: Date;
}

interface IUserInfo {
  id: number | null;
  email: string | null;
  name: string | null;
  profilePicture: string | null;
  about?: string;

  // sentMessages: IMessage[];
  // recievedMessages: IMessage[];
}

interface IUser {
  newUserImgSrc: string;
  setNewImgSrc: (src: string) => void;
  currentChatUser: IUserInfo | null;
  setCurrentChatUser: (user: IUserInfo) => void;
  setOnlineUsers: (onlineUsers: TOnlineUsers) => void;
  onlineUsers: TOnlineUsers | null;
}

interface IUseMutateAccount {
  mapper?: (data: any) => any;
  onSuccess?: TVoidFunc;
  onError?: (err: any) => void;
  queryKey: string[];
  url: string;
}

interface IUseAddMessage {
  mapper?: (data: any) => any;
  onSuccess?: TVoidFunc;
  onError?: (err: any) => void;
}

interface IUseQueryOoptionType<T>
  extends UseQueryOptions<AxiosResponse<T>, AxiosError, T, QueryKey[]> {}

type TVoidFunc = () => void;

interface IUseGetAccount {
  mapper?: (data: any) => any;
  options?: IUseQueryOoptionType<any>;
  queryKey: (string | number)[];
  url: string;
}

interface IGetMessages {
  options?: IUseQueryOoptionType<any>;
}

interface IUsePostAccount extends IUseGetAccount {
  body: { email: string };
}

interface IUseGetMessagesMutation {
  mapper?: (data: any) => any;
}

export type {
  TToastType,
  IUiState,
  IMessage,
  IUser,
  IUseMutateAccount,
  IUseQueryOoptionType,
  TVoidFunc,
  IUseGetAccount,
  IUsePostAccount,
  IUserInfo,
  IUseAddMessage,
  ISocket,
  IGetMessages,
  IUseGetMessagesMutation,
  TOnlineUser,
  TOnlineUsers,
};
