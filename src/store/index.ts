import { TOAST_TYPE } from "@/constant/type";
import type {
  ISearchStore,
  ISocket,
  IUiState,
  IUser,
  IUserInfo,
  TOnlineUsers,
  TToastType,
} from "@/type";
import { Socket } from "socket.io-client";
import { create } from "zustand";

export const useUserStore = create<IUser>((set, get) => ({
  newUserImgSrc: "/default_avatar.png",
  currentChatUser: null,
  onlineUsers: null,
  setNewImgSrc: (src: string) => set({ newUserImgSrc: src }),
  setCurrentChatUser: (user: IUserInfo) => set({ currentChatUser: user }),
  setOnlineUsers: (onlineUsers: TOnlineUsers) => {
    set({ onlineUsers });
  },
  setLoggedInUserInfo: (info: IUserInfo | null | undefined) => {
    set({ loggedInUserInfo: info });
  },
  loggedInUserInfo: null,
}));

export const useUiState = create<IUiState>((set, get) => ({
  isToastVisible: true,
  toastMessage: "Hope you have a great day!",
  toastType: TOAST_TYPE.SMILE,
  isContactsVisible: false,
  toggleContactsVisible: () =>
    set({ isContactsVisible: !get().isContactsVisible }),
  updateToastInfo: ({
    type,
    msg,
    toggle,
  }: {
    type?: TToastType;
    msg?: string;
    toggle?: boolean;
  }) => {
    set({
      isToastVisible: !get().isToastVisible,
      ...(toggle && { isToastVisible: !get().isToastVisible }),
      ...(msg ? { toastMessage: msg } : { toastMessage: get().toastMessage }),
      ...(type ? { toastType: type } : { toastType: get().toastType }),
    });
  },
}));

export const useSocketStore = create<ISocket>((set, get) => ({
  socket: undefined,
  setSocket: (socket: Socket) => set({ socket }),
}));

export const useSearchStore = create<ISearchStore>((set, get) => ({
  isSearchingMessage: false,
  allMessageSearchValue: "",

  filteredChatList: [],
  toggleIsSearchingMessage: () =>
    set({
      isSearchingMessage: !get().isSearchingMessage,
    }),

  setFilteredChatList: (filteredChatList: number[]) => {
    set({
      filteredChatList,
    });
  },
  setAllMessageSearchValue: (value: string) => {
    set({
      allMessageSearchValue: value,
    });
  },
}));
