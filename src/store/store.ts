import { create } from "zustand";

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
