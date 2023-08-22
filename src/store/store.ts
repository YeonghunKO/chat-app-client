import { create } from "zustand";

export type TToastType = "WARN" | "ERROR" | "SUCESSFUL";

const initContactState = {
  contactsPage: false,
  contactSearch: "",
  filteredContacts: [],
  userContacts: [],
};

const initMessageState = {
  messageSearch: false,
  messages: [],
};

const initCallState = {
  socket: undefined,
  videoCall: undefined,
  voiceCall: undefined,
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,
};

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

interface IUser {
  userInfo?: {
    id: number;
    email: string;
    name: string;
    profilePicture: string;
    about: string;
    sentMessages: IMessage[];
    recievedMessages: IMessage[];
  };
  newUserImgSrc: string;
  newUser: boolean;
  currentChatUser: any;
  onlineUsers: any[];
  setNewImgSrc: (src: string) => void;
}

export const useUserStore = create<IUser>((set, get) => ({
  newUserImgSrc: "/default_avatar.png",
  userInfo: undefined,
  newUser: false,
  currentChatUser: undefined,
  onlineUsers: [],

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
