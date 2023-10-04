// state
import { useUiState } from "@/store";

// components
import ChatListHeader from "./ChatListHeader";
import List from "./List";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { memo } from "react";

const ContactsList = dynamic(() => import("./ContactsList"), { ssr: false });

const ChatList = () => {
  const isContactsListVisible = useUiState((set) => set.isContactsVisible);

  return (
    <section className="z-20 flex max-h-screen flex-col bg-panel-header-background">
      {isContactsListVisible ? (
        <>
          <ContactsList />
        </>
      ) : (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}
    </section>
  );
};

export default memo(ChatList);
