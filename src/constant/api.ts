const AUTH_ROUTE = "/api/auth";

export const SIGN_IN_USER = `${AUTH_ROUTE}/sign-in`;
export const SIGN_UP_USER = `${AUTH_ROUTE}/sign-up`;
export const REFRESH = `${AUTH_ROUTE}/refresh`;

export const COOKIE = {
  REFRESH_IDX: "refreshTokenIdx",
  ACCESS_TOKEN: "accessToken",
};