import type { IUiState, IUser, TToastType } from "@/type/user";
import { create } from "zustand";

export const useUserStore = create<IUser>((set, get) => ({
  newUserImgSrc: "/default_avatar.png",
  userInfo: null,
  setNewImgSrc: (src: string) => set({ newUserImgSrc: src }),
}));

export const useUiState = create<IUiState>((set, get) => ({
  isToastVisible: false,
  toastMessage: "",
  toastType: "SUCESSFUL",
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
      ...(toggle && { isToastVisible: !get().isToastVisible }),
      ...(msg ? { toastMessage: msg } : { toastMessage: get().toastMessage }),
      ...(type ? { toastType: type } : { toastType: get().toastType }),
    }),
}));
