import { rest, PathParams } from "msw";
import { SIGN_IN_USER } from "@/constant/api";
import { MOCKED_LOGIN_USER_INFO, MOCKED_USERS } from "../constant";

type ResBody = Omit<typeof MOCKED_LOGIN_USER_INFO, "password">;

type PostLoginReqBody = {
  email: string;
  password: string;
};

type PostLoginSuccessRes = {
  user: ResBody;
};

type PostLoginFailedRes = {
  ok: boolean;
  message: string;
};

type PostLoginRes = PostLoginSuccessRes | PostLoginFailedRes;

const postLoginHandler = [
  rest.post<PostLoginReqBody, PathParams, PostLoginRes>(
    SIGN_IN_USER,
    (request, response, ctx) => {
      const loginBody = request.body;

      const isUserExist = MOCKED_USERS.find((user) => user === loginBody.email);

      if (!isUserExist) {
        return response(
          ctx.status(401),
          ctx.json({
            ok: false,
            message: "user does not exist",
          }),
        );
      }

      if (MOCKED_LOGIN_USER_INFO.password !== loginBody.password) {
        return response(
          ctx.status(401),
          ctx.json({
            ok: false,
            message: "password is incorrect",
          }),
        );
      }

      if (
        loginBody.email === MOCKED_LOGIN_USER_INFO.email &&
        loginBody.password === MOCKED_LOGIN_USER_INFO.password
      ) {
        return response(
          ctx.status(201),
          ctx.json({
            user: {
              about: MOCKED_LOGIN_USER_INFO.about,
              email: MOCKED_LOGIN_USER_INFO.email,
              name: MOCKED_LOGIN_USER_INFO.name,
              profilePicture: MOCKED_LOGIN_USER_INFO.profilePicture,
            },
          }),
        );
      }
    },
  ),
];

export { postLoginHandler };
