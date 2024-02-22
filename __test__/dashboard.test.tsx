import ChatBox from "@/components/ChatBox";
import { customRender } from "./customRender";
import { screen } from "@testing-library/react";

import {
  MOCKED_CURRENT_CHAT_USER,
  MOCKED_LOGGED_IN_USER_INFO,
  MOCKED_ONLINE_USERS,
} from "@/mocks/constant";

const mockedUserInfo = {
  newUserImgSrc: "/default_avatar.png",
  currentChatUser: MOCKED_CURRENT_CHAT_USER,
  onlineUsers: MOCKED_ONLINE_USERS,
  setNewImgSrc: jest.fn(),
  setCurrentChatUser: jest.fn(),
  setOnlineUsers: jest.fn(),
  setLoggedInUserInfo: jest.fn(),
  ...MOCKED_LOGGED_IN_USER_INFO,
};

jest.mock("../src/store", () => ({
  ...jest.requireActual("../src/store"),
  useUserStore: jest.fn((set) => mockedUserInfo),
}));

jest.mock("../src/hooks/useStore.ts", () => ({
  ...jest.requireActual("../src/hooks/useStore.ts"),
  useStore: jest.fn(() => ({
    currentChatUser: MOCKED_CURRENT_CHAT_USER,
  })),
}));

const setUp = () => {
  const utils = customRender(<ChatBox />);
  return {
    ...utils,
  };
};

describe("test sending text messages and wait for it to appear", () => {
  it("should send text messages", () => {
    const utils = setUp();

    screen.debug();
  });
});
