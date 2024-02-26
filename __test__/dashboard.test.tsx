import ChatBox from "@/components/ChatBox";
import { customRender } from "./customRender";
import { screen } from "@testing-library/react";

import {
  MOCKED_CURRENT_CHAT_USER,
  MOCKED_LOGGED_IN_USER_INFO,
  MOCKED_ONLINE_USERS,
} from "@/mocks/constant";
import userEvent from "@testing-library/user-event";

const mockedUserInfo = {
  newUserImgSrc: "/default_avatar.png",
  currentChatUser: MOCKED_CURRENT_CHAT_USER,
  onlineUsers: MOCKED_ONLINE_USERS,
  setNewImgSrc: jest.fn(),
  setCurrentChatUser: jest.fn(),
  setOnlineUsers: jest.fn(),
  setLoggedInUserInfo: jest.fn(),
  loggedInUserInfo: MOCKED_LOGGED_IN_USER_INFO,
};

const mockedUseStore = {
  currentChatUser: MOCKED_CURRENT_CHAT_USER,
};

jest.mock("../src/store", () => ({
  ...jest.requireActual("../src/store"),
  useUserStore: jest.fn((callBack) => callBack(mockedUserInfo)),
}));

jest.mock("../src/hooks/useStore.ts", () => ({
  ...jest.requireActual("../src/hooks/useStore.ts"),
  useStore: jest.fn((storage, setCallBack) => setCallBack(mockedUseStore)),
}));

const setUp = () => {
  const utils = customRender(<ChatBox />);

  const messageInput = screen.getByPlaceholderText(/type a message/i);
  const messageSubmitButton = screen.getByTestId("send-message");

  const changeMessageInput = async (message: string) =>
    await userEvent.type(messageInput, message);
  const submitMessage = async () => await userEvent.click(messageSubmitButton);

  return {
    ...utils,
    changeMessageInput,
    submitMessage,
  };
};

describe("test sending text messages and wait for it to appear", () => {
  it("should send text messages", async () => {
    // arrange
    const utils = setUp();

    // act
    await utils.changeMessageInput("new message");
    await utils.submitMessage();

    // assert
    const newMessage = await screen.findByText(/new message/i);
    expect(newMessage).toBeInTheDocument;
  });
});
