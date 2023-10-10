// state
import { useUiState } from "@/store";

// components
import ContactHeader from "./ContactHeader";
import ChatList from "./ChatList";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { memo } from "react";

const UsersList = dynamic(() => import("./UsersList"), { ssr: false });

const ContactInfo = () => {
  const isContactsListVisible = useUiState((set) => set.isContactsVisible);

  return (
    <aside className="z-20 flex max-h-screen flex-col bg-panel-header-background">
      {isContactsListVisible ? (
        <>
          <UsersList />
        </>
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
