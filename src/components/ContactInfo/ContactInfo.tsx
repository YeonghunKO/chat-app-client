// settings
import { memo } from "react";

// state
import { useUiState } from "@/store";

// components
import ContactHeader from "./ContactHeader";
import ChatList from "./ChatList";
import SearchBar from "./SearchBar";
import UsersListContainer from "./UsersListContainer";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const ContactInfo = () => {
  const isContactsListVisible = useUiState((set) => set.isContactsVisible);
  const { toggleContactInfoVisible, isContactsInfoVisible } = useUiState(
    (set) => ({
      toggleContactInfoVisible: set.toggleContactInfoVisible,
      isContactsInfoVisible: set.isCotactsInfoVisible,
    }),
  );

  return (
    <aside
      className={`absolute ${
        isContactsInfoVisible ? "animate-slide-right" : "animate-slide-left"
      } top-0 z-20 flex h-screen max-h-screen w-[40dvw] flex-col bg-panel-header-background`}
    >
      <div
        className="absolute -right-[20px] top-[15px] cursor-pointer rounded-full bg-[#111B21] p-2 text-white"
        onClick={toggleContactInfoVisible}
      >
        {isContactsInfoVisible ? <IoIosArrowBack /> : <IoIosArrowForward />}
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
