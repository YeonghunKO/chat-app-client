// settings
import { memo } from "react";

// state
import { useUiState } from "@/store";

// components
import ContactHeader from "./ContactHeader";
import ChatList from "./ChatList";
import SearchBar from "./SearchBar";
import UsersListContainer from "./UsersListContainer";
import { IoIosArrowBack } from "react-icons/io";

const ContactInfo = () => {
  const isContactsListVisible = useUiState((set) => set.isContactsVisible);
  const { isContactInfoClosed, toggleContactInfoClosed } = useUiState(
    (set) => ({
      isContactInfoClosed: set.isContactInfoClosed,
      toggleContactInfoClosed: set.toggleContactInfoClosed,
    }),
  );

  const handleCloseInfoButton = () => {
    toggleContactInfoClosed(true);
  };

  return (
    <aside
      className={`absolute ${
        isContactInfoClosed
          ? "animate-contact-slide-left"
          : "animate-contact-slide-right"
      } top-0 z-20 flex h-[100dvh] max-h-screen w-[100dvw] flex-col bg-panel-header-background md:w-[35dvw] lg:w-[25dvw]`}
    >
      <div
        onClick={handleCloseInfoButton}
        className="absolute right-[8px] top-1/2 cursor-pointer rounded-full bg-transparent text-[20px]
text-[#ADBAC1]"
      >
        {isContactInfoClosed ? null : <IoIosArrowBack />}
      </div>

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
