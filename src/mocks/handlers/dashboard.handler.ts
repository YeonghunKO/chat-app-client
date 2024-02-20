import { DefaultBodyType, PathParams, rest } from "msw";
import { MOCKED_LOGGED_IN_USER_INFO } from "../constant";
import { GET_USER } from "@/constant/api";

type GetLoggedInUserInfo = typeof MOCKED_LOGGED_IN_USER_INFO;

export const dashboardHandlers = [
  rest.get<DefaultBodyType, PathParams, GetLoggedInUserInfo>(
    GET_USER(MOCKED_LOGGED_IN_USER_INFO.about),
    (req, res, ctx) => {
      return res(ctx.status(201), ctx.json(MOCKED_LOGGED_IN_USER_INFO));
    },
  ),
];
