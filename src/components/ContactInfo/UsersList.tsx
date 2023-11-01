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
import { useEffect, useState } from "react";

const UsersList = () => {
  const toggleContacts = useUiState((set) => set.toggleContactsVisible);
  const [contactSearchValue, setContactSearchValue] = useState("");
  const [originalContacts, setOriginalContacts] =
    useState<[string, IUserInfo[]][]>();
  const [filtleredContacts, setFilteredContacts] =
    useState<(readonly [string, IUserInfo[]] | null)[]>();

  const { data } = useGetQueryAccount<{
    users: { [key: string]: IUserInfo[] };
  }>({
    url: GET_ALL_USERS,
    queryKey: queryKeys.users,
  });

  useEffect(() => {
    if (data?.users) {
      const users = Object.entries(data.users);

      setOriginalContacts(users);
    }
  }, [data?.users]);

  useEffect(() => {
    const filteredContacts = originalContacts?.map((userInfo) => {
      const [keyword, users] = userInfo;

      const filteredUsers = users?.filter((user) => {
        return user.name
          ?.toLocaleLowerCase()
          .includes(contactSearchValue.toLocaleLowerCase());
      });
      const result = [keyword, filteredUsers] as const;
      if (filteredUsers?.length) {
        return result;
      } else {
        return null;
      }
    });

    if (filteredContacts) {
      setFilteredContacts(filteredContacts);
    }
  }, [contactSearchValue]);

  const isResultEmpty = filtleredContacts?.every((contact) => !contact);

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
        {filtleredContacts?.length ? (
          isResultEmpty ? (
            <div className="flex h-full items-center justify-center">
              No contact found.
            </div>
          ) : (
            filtleredContacts?.map((userListInfo) => {
              if (userListInfo) {
                const [initialLetter, userList] = userListInfo;
                if (initialLetter && userList) {
                  return (
                    <div key={Date.now() + initialLetter} className="py-[10px]">
                      <div className="pb-[5px]  pl-[10px] text-teal-light">
                        {initialLetter}
                      </div>
                      {userList.map((userInfo) => {
                        return (
                          <ContactItem userInfo={userInfo} key={userInfo.id} />
                        );
                      })}
                    </div>
                  );
                }
              }

              return null;
            })
          )
        ) : (
          originalContacts?.map((userListInfo) => {
            if (userListInfo) {
              const [initialLetter, userList] = userListInfo;
              if (initialLetter && userList) {
                return (
                  <div key={Date.now() + initialLetter} className="py-[10px]">
                    <div className="pb-[5px]  pl-[10px] text-teal-light">
                      {initialLetter}
                    </div>
                    {userList.map((userInfo) => {
                      return (
                        <ContactItem userInfo={userInfo} key={userInfo.id} />
                      );
                    })}
                  </div>
                );
              }
            }

            return null;
          })
        )}
      </div>
    </div>
  );
};

export default UsersList;
