// components
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ContactItem from "./ContactItem";

// business
import { useGetQueryAccount } from "@/hooks/useQueryAccount";
import { GET_ALL_USERS } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";
import { useUiState } from "@/store";
import { IUserInfo } from "@/type";
import Input from "../common/Input";
import { useState } from "react";

const UsersList = () => {
  const toggleContacts = useUiState((set) => set.toggleContactsVisible);
  const [contactSearchValue, setContactSearchValue] = useState("");

  const { data, isError, isSuccess, isLoading } = useGetQueryAccount<{
    users: { [key: string]: IUserInfo[] };
  }>({
    url: GET_ALL_USERS,
    queryKey: queryKeys.users,
  });

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  const handleBackButton = () => {
    toggleContacts();
  };

  if (isSuccess) {
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
          {Object.entries(data.users).map(([initialLetter, userList]) => {
            return (
              <div key={Date.now() + initialLetter} className="py-[10px]">
                <div className="pb-[5px]  pl-[10px] text-teal-light">
                  {initialLetter}
                </div>
                {userList.map((userInfo) => {
                  return <ContactItem userInfo={userInfo} key={userInfo.id} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default UsersList;
