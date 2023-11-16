import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { QueryKey, UseQueryOptions } from "react-query";
import { Socket } from "socket.io-client";

type TToastType = "WARN" | "ERROR" | "SUCESSFUL" | "SMILE";
type TMessageType = "text" | "image" | "audio" | string;
type TMEssageStatus = "read" | "delivered" | "sent" | string;

type TOnlineUser = { socketId: string; chatRoomId: number | undefined };
type TOnlineUsers = Map<number | any, TOnlineUser>;

type TVoidFunc = () => void;

type TGetMessages = IUseQueryOoptionType<any>;

interface ISearchStore {
  isSearchingMessage: boolean;
  filteredChatList: any[];
  toggleIsSearchingMessage: () => void;
  setFilteredChatList: (filteredChatList: number[]) => void;
  allMessageSearchValue: string;
  setAllMessageSearchValue: (value: string) => void;
}

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
  senderId: number;
  recieverId: number;
  type: TMessageType;
  message: string;
  status: TMEssageStatus;
  createdAt: string;
}

interface IUserInfo {
  id: number | null;
  email: string | null;
  name: string | null;
  profilePicture: string | null;
  about?: string;
}

interface IUser {
  newUserImgSrc: string;
  setNewImgSrc: (src: string) => void;
  currentChatUser: IUserInfo | null;
  setCurrentChatUser: (user: IUserInfo) => void;
  setOnlineUsers: (onlineUsers: TOnlineUsers) => void;
  setLoggedInUserInfo: (userInfo: IUserInfo | null | undefined) => void;
  onlineUsers: TOnlineUsers | null;
  loggedInUserInfo: IUserInfo | null | undefined;
}

interface IUseMutateAccount {
  mapper?: (data: any) => any;
  onSuccess?: TVoidFunc;
  onError?: (err: any) => void;
  queryKey: string[];
  url: string;
  httpOptions?: AxiosRequestConfig;
}

interface IUseAddMessage {
  mapper?: (data: any) => any;
  onSuccess?: TVoidFunc;
  onError?: (err: any) => void;
}

interface IUseAddMulitMessage {
  mapper?: (data: any) => any;
  onSuccess?: TVoidFunc;
  onError?: (err: any) => void;
  url: string;
}

interface IUseQueryOoptionType<T>
  extends UseQueryOptions<AxiosResponse<T>, AxiosError, T, QueryKey[]> {}

interface IUseGetAccount {
  mapper?: (data: any) => any;
  options?: IUseQueryOoptionType<any>;
  queryKey: (string | number)[];
  url: string;
}

interface IUsePostAccount extends IUseGetAccount {
  body: { email: string };
}

interface IUseGetMessagesMutation {
  mapper?: (data: any) => any;
}

interface IUseMutationGetQuery {
  queryKey: (string | number)[];
  mutationFunc: (data: any) => any;
  onSuccess?: (data: any) => any;
  onError?: (err: any) => void;
}

export type {
  TToastType,
  TMessageType,
  TMEssageStatus,
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
  TGetMessages,
  IUseGetMessagesMutation,
  TOnlineUser,
  TOnlineUsers,
  IUseAddMulitMessage,
  ISearchStore,
  IUseMutationGetQuery,
};
