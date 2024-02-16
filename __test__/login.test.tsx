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

describe("Login", () => {
  it.only("successfully logged in", async () => {
    customRender(<Login />);

    const emailInput = screen.getByRole("textbox", { name: "Display Email" });
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", {
      name: "Login an Account",
    });

    await userEvent.type(emailInput, MOCKED_LOGIN_USER_INFO.email);
    await userEvent.type(passwordInput, MOCKED_LOGIN_USER_INFO.password);
    await userEvent.click(submitButton);
    expect(pushMock).toHaveBeenCalledWith(DASHBOARD);
  });

  it("failed to log in", () => {
    customRender(<Login />);
    // screen.debug();
  });
});
