// settings
import { memo } from "react";

// state
import { useUiState } from "@/store";

// components
import ContactHeader from "./ContactHeader";
import ChatList from "./ChatList";
import SearchBar from "./SearchBar";
import UsersListContainer from "./UsersListContainer";

const ContactInfo = () => {
  const isContactsListVisible = useUiState((set) => set.isContactsVisible);

  return (
    <aside className="z-20 flex max-h-screen flex-col bg-panel-header-background">
      {isContactsListVisible ? (
        <UsersListContainer />
      ) : (
        <>
          <ContactHeader />
          <SearchBar />
          <ChatList />
        </>
      )}
    </aside>
  );
};

export default memo(ContactInfo);
