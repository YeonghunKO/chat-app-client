import { useUserStore } from "@/store";

const ChatHeader = () => {
  const currentChatUser = useUserStore((set) => set.currentChatUser);
  return <div>{currentChatUser?.name}</div>;
};

export default ChatHeader;
