const AUTH_ROUTE = "/auth";
const MESSAGE_ROUTE = "/message";

export const SIGN_IN_USER = `${AUTH_ROUTE}/sign-in`;
export const SIGN_UP_USER = `${AUTH_ROUTE}/sign-up`;
export const REFRESH = `${AUTH_ROUTE}/refresh`;

export const GET_USER = (email: string) => `${AUTH_ROUTE}/user/${email}`;
export const GET_ALL_USERS = `${AUTH_ROUTE}/users`;

export const GET_MESSAGES = (from: number, to: number) =>
  `${MESSAGE_ROUTE}/from/${from}/to/${to}`;

export const FILTERED_MESSAGE = `${MESSAGE_ROUTE}`;

export const ADD_MESSAGE = `${MESSAGE_ROUTE}`;
export const ADD_IMAGE_MESSAGE = `${MESSAGE_ROUTE}/image`;
export const ADD_AUDIO_MESSAGE = `${MESSAGE_ROUTE}/audio`;

export const UPDATE_CHAT_LIST = (userId: number) =>
  `${MESSAGE_ROUTE}/chat-list/${userId}`;

export const COOKIE = {
  REFRESH_IDX: "refreshTokenIdx",
  ACCESS_TOKEN: "accessToken",
};
