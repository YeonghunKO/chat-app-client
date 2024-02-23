import { DefaultBodyType, PathParams, rest } from "msw";
import {
  MOCKED_CURRENT_CHAT_USER,
  MOCKED_LOGGED_IN_USER_INFO,
  MOCKED_MESSAGES,
} from "../constant";
import { GET_MESSAGES, GET_USER } from "@/constant/api";

type GetLoggedInUserInfo = typeof MOCKED_LOGGED_IN_USER_INFO;

export const dashboardHandlers = [
  rest.get<DefaultBodyType, PathParams, GetLoggedInUserInfo>(
    GET_USER(MOCKED_LOGGED_IN_USER_INFO.email),
    (req, res, ctx) => {
      return res(ctx.status(201), ctx.json(MOCKED_LOGGED_IN_USER_INFO));
    },
  ),
  rest.get<DefaultBodyType, PathParams, typeof MOCKED_MESSAGES>(
    GET_MESSAGES(MOCKED_LOGGED_IN_USER_INFO.id, MOCKED_CURRENT_CHAT_USER.id),
    (req, res, ctx) => {
      return res(ctx.status(201), ctx.json(MOCKED_MESSAGES));
    },
  ),
];
