import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { customRender } from "./customRender";
import Login from "@/pages/login";
import { MOCKED_LOGIN_USER_INFO } from "../src/mocks/constant";
import { DASHBOARD } from "@/constant/path";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

const setUp = () => {
  const utils = customRender(<Login />);
  const emailInput = screen.getByRole("textbox", { name: "Display Email" });
  const passwordInput = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button", {
    name: "Login an Account",
  });

  const changeEmailnput = async (email: string) =>
    await userEvent.type(emailInput, email);
  const changePassowordInput = async (password: string) =>
    await userEvent.type(passwordInput, password);
  const submit = async () => await userEvent.click(submitButton);

  return {
    ...utils,
    changeEmailnput,
    changePassowordInput,
    submit,
  };
};

it.only("successfully logged in", async () => {
  // arrange
  const utils = setUp();

  // act
  await utils.changeEmailnput(MOCKED_LOGIN_USER_INFO.email);
  await utils.changePassowordInput(MOCKED_LOGIN_USER_INFO.password);
  await utils.submit();

  // assert
  expect(pushMock).toHaveBeenCalledWith(DASHBOARD);
});

describe("failed to log in", () => {
  it("user doesn't exist", () => {
    const utils = setUp();

    // screen.debug();
  });
});
