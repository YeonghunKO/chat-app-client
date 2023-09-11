const AUTH_ROUTE = "/api/auth";
const MESSAGE_ROUTE = "/api/message";

export const SIGN_IN_USER = `${AUTH_ROUTE}/sign-in`;
export const SIGN_UP_USER = `${AUTH_ROUTE}/sign-up`;
export const REFRESH = `${AUTH_ROUTE}/refresh`;

export const GET_USER = (email: string) => `${AUTH_ROUTE}/user/${email}`;
export const GET_ALL_USERS = `${AUTH_ROUTE}/users`;

export const GET_MESSAGES = (from: number, to: number) =>
  `${MESSAGE_ROUTE}/get-messages/${from}/${to}`;

export const ADD_MESSAGE = `${MESSAGE_ROUTE}/add-message`;

export const COOKIE = {
  REFRESH_IDX: "refreshTokenIdx",
  ACCESS_TOKEN: "accessToken",
};
