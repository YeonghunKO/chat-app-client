import { DefaultBodyType, PathParams, rest } from "msw";
import {
  MOCKED_CURRENT_CHAT_USER,
  MOCKED_LOGGED_IN_USER_INFO,
  MOCKED_MESSAGES,
} from "../constant";
import { ADD_MESSAGE, GET_MESSAGES, GET_USER } from "@/constant/api";

type GetLoggedInUserInfo = typeof MOCKED_LOGGED_IN_USER_INFO;

type PostSendMessage = {
  from: number;
  to: number;
  message: string;
};

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
  rest.post<
    PostSendMessage,
    PathParams,
    {
      id: number;
      senderId: number;
      recieverId: number;
      message: string;
      type: string;
      status: string;
      createdAt: string;
    }
  >(ADD_MESSAGE, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 3,
        senderId: MOCKED_LOGGED_IN_USER_INFO.id,
        recieverId: MOCKED_CURRENT_CHAT_USER.id,
        message: req.body.message,
        type: "text",
        status: "sent",
        createdAt: new Date().toISOString(),
      }),
    );
  }),
];
