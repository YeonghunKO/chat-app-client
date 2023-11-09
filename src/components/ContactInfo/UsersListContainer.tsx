// settings
import { Suspense, useState } from "react";

// components
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import Input from "../common/Input";
import Loading from "../common/Loading";
import UsersList from "./UsersList";

// business
import { useUiState } from "@/store";

const UsersListContainer = () => {
  const toggleContacts = useUiState((set) => set.toggleContactsVisible);
  const [contactSearchValue, setContactSearchValue] = useState("");

  const handleBackButton = () => {
    toggleContacts();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[60px] items-end px-3 py-4">
        <div className="flex  items-center gap-12 text-white">
          <BiArrowBack
            className=" cursor-pointer text-xl"
            onClick={handleBackButton}
          />
          <span className="">New Chat</span>
        </div>
      </div>
      <div className="custom-scrollbar h-full flex-auto overflow-auto bg-search-input-container-background">
        <div className=" flex h-14 items-center gap-3 px-4 py-3">
          <div className="mt-3 flex flex-grow items-center gap-5 rounded-lg px-3 py-2">
            <div>
              <BiSearchAlt2 className="text-l cursor-pointer text-panel-header-icon" />
            </div>
            <div className="w-full">
              <Input
                value={contactSearchValue}
                setValue={setContactSearchValue}
                placeholder="Search Contacts"
              />
            </div>
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <UsersList contactSearchValue={contactSearchValue} />
        </Suspense>
      </div>
    </div>
  );
};

export default UsersListContainer;
