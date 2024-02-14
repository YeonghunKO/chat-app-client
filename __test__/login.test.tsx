import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Login from "@/pages/Login";
import Layout from "@/components/common/Layout";
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
