import { AxiosError, AxiosResponse } from "axios";
import { QueryKey, UseQueryOptions } from "react-query";

type TToastType = "WARN" | "ERROR" | "SUCESSFUL";

interface IUiState {
  isToastVisible: boolean;
  toastMessage: string;
  toastType: TToastType;
  updateToastInfo: ({
    type,
    msg,
    toggle,
  }: {
    type?: TToastType;
    msg?: string;
    toggle?: boolean;
  }) => void;
}

interface IMessage {
  id: number;
  sender: IUser;
  senderId: number;
  reciever: IUser;
  recieverId: number;
  type: string;
  message: string;
  messageStatus: string;
  createdAt: object;
}

interface IUserInfo {
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
}

interface IUseMutateUserAccount {
  mapper?: (data: any) => any;
  onSuccess?: TVoidFunc;
  onError?: TVoidFunc;
  queryKey: string[];
  url: string;
}

interface IUseQueryOoptionType<T>
  extends UseQueryOptions<AxiosResponse<T>, AxiosError, T, QueryKey[]> {}

type TVoidFunc = () => void;

interface IUseGetUserAccount {
  mapper?: (data: any) => any;
  options?: IUseQueryOoptionType<any>;
  queryKey: string[];
  url: string;
}

interface IUsePostUserAccount extends IUseGetUserAccount {
  body: { email: string };
}

export type {
  TToastType,
  IUiState,
  IMessage,
  IUser,
  IUseMutateUserAccount,
  IUseQueryOoptionType,
  TVoidFunc,
  IUseGetUserAccount,
  IUsePostUserAccount,
  IUserInfo,
};
