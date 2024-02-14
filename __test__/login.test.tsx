import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import Login from "@/pages/Login";
import { customRender } from "./customRender";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => null,
    };
  },
}));

describe("Login", () => {
  it("test login", () => {
    customRender(<Login />);
    screen.debug();
  });
});
