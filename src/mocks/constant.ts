import { IMessage } from "@/type";

export const MOCKED_LOGIN_USER_INFO = {
  email: "sinkyo@gmail.com",
  password: "test123",
  name: "sinkyo",
  profilePicture: "sinkyo_profile.png",
  about: "me",
};

export const MOCKED_LOGGED_IN_USER_INFO = {
  email: "sinkyo@gmail.com",
  name: "sinkyo",
  profilePicture: "sinkyo_profile.png",
  about: "me",
  id: 3,
};

export const MOCKED_MESSAGES = [
  [
    "2023-12-07",
    [
      {
        id: 693,
        senderId: 3,
        recieverId: 7,
        message: "hey",
        type: "text",
        status: "read",
        createdAt: "2023-12-07T01:32:41.076Z",
      },
      {
        id: 694,
        senderId: 3,
        recieverId: 7,
        message: "sub",
        type: "text",
        status: "read",
        createdAt: "2023-12-07T01:58:39.459Z",
      },

      {
        id: 696,
        senderId: 3,
        recieverId: 7,
        message: "cool",
        type: "text",
        status: "read",
        createdAt: "2023-12-07T02:03:03.022Z",
      },
      {
        id: 697,
        senderId: 7,
        recieverId: 3,
        message: "sub",
        type: "text",
        status: "read",
        createdAt: "2023-12-07T02:03:44.847Z",
      },
      {
        id: 698,
        senderId: 3,
        recieverId: 7,
        message: "cool",
        type: "text",
        status: "read",
        createdAt: "2023-12-07T02:03:51.682Z",
      },
      {
        id: 699,
        senderId: 3,
        recieverId: 7,
        message: "🌐😃ww",
        type: "text",
        status: "read",
        createdAt: "2023-12-07T02:04:53.951Z",
      },
      {
        id: 700,
        senderId: 7,
        recieverId: 3,
        message: "d",
        type: "text",
        status: "read",
        createdAt: "2023-12-07T02:06:01.609Z",
      },
      {
        id: 701,
        senderId: 3,
        recieverId: 7,
        message: "fw",
        type: "text",
        status: "read",
        createdAt: "2023-12-07T02:06:22.117Z",
      },
    ],
  ],
  [
    "2023-12-14",
    [
      {
        id: 702,
        senderId: 7,
        recieverId: 3,
        message: "안녕!",
        type: "text",
        status: "read",
        createdAt: "2023-12-14T12:51:00.464Z",
      },
      {
        id: 703,
        senderId: 3,
        recieverId: 7,
        message: "하이",
        type: "text",
        status: "read",
        createdAt: "2023-12-14T12:51:08.644Z",
      },
      {
        id: 705,
        senderId: 3,
        recieverId: 7,
        message: "어이",
        type: "text",
        status: "read",
        createdAt: "2023-12-14T12:51:34.630Z",
      },
    ],
  ],
] satisfies [string, IMessage[]][];

export const MOCKED_ONLINE_USERS = new Map();

MOCKED_ONLINE_USERS.set(3, {
  chatRoomId: 3,
  socketId: "blahblah",
});

MOCKED_ONLINE_USERS.set(7, {
  chatRoomId: 3,
  socketId: "blahblah",
});

export const MOCKED_CURRENT_CHAT_USER = {
  email: "aeika@gmail.com",
  name: "aeika",
  profilePicture: "aeika_profile.png",
  about: "chat_user",
  id: 7,
};

export const MOCKED_USERS = [
  "sinkyo@gmail.com",
  "aeika@gmail.com",
  "amaya@gmail.com",
];
