import { useUiState } from "@/store";
import ChatListHeader from "./ChatListHeader";
import List from "./List";
import SearchBar from "./SearchBar";
import ContactsList from "./ContactsList";

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

export default ChatList;
