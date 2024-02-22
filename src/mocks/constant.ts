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
  id: 1,
};

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
