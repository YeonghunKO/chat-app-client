// state
import { useUiState } from "@/store";

// components
import ContactHeader from "./ContactHeader";
import ChatList from "./ChatList";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { memo } from "react";
import Loading from "../common/Loading";

const UsersList = dynamic(() => import("./UsersList"), {
  ssr: false,
  loading: () => <Loading />,
});

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
