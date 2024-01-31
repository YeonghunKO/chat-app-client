const AUTH_ROUTE = "/auth";
const MESSAGE_ROUTE = "/message";

export const SIGN_IN_USER = `${AUTH_ROUTE}/sign-in`;
export const SIGN_UP_USER = `${AUTH_ROUTE}/sign-up`;
export const REFRESH = `${AUTH_ROUTE}/refresh`;

export const GET_USER = (email: string) => `${AUTH_ROUTE}/user/${email}`;
export const GET_ALL_USERS = `${AUTH_ROUTE}/users`;

export const GET_MESSAGES = (from: number, to: number) =>
  `${MESSAGE_ROUTE}/messages/from/${from}/to/${to}`;

export const FILTERED_MESSAGE = (userId: number | null, message: string) =>
  `${MESSAGE_ROUTE}/filter-message/${userId}/${message}`;

export const ADD_MESSAGE = `${MESSAGE_ROUTE}/messages`;
export const ADD_IMAGE_MESSAGE = `${MESSAGE_ROUTE}/add-image-message`;
export const ADD_AUDIO_MESSAGE = `${MESSAGE_ROUTE}/add-audio-message`;

export const UPDATE_CHAT_LIST = (userId: number) =>
  `${MESSAGE_ROUTE}/get-updated-chat-list/${userId}`;

export const COOKIE = {
  REFRESH_IDX: "refreshTokenIdx",
  ACCESS_TOKEN: "accessToken",
};
