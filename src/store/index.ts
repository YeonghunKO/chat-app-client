import type { IUiState, IUser, IUserInfo, TToastType } from "@/type";
import { create } from "zustand";

export const useUserStore = create<IUser>((set, get) => ({
  newUserImgSrc: "/default_avatar.png",
  currentChatUser: null,
  setNewImgSrc: (src: string) => set({ newUserImgSrc: src }),
  setCurrentChatUser: (user: IUserInfo) => set({ currentChatUser: user }),
}));

export const useUiState = create<IUiState>((set, get) => ({
  isToastVisible: false,
  toastMessage: "",
  toastType: "SUCESSFUL",
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
  }) =>
    set({
      isToastVisible: !get().isToastVisible,
      ...(toggle && { isToastVisible: !get().isToastVisible }),
      ...(msg ? { toastMessage: msg } : { toastMessage: get().toastMessage }),
      ...(type ? { toastType: type } : { toastType: get().toastType }),
    }),
}));
