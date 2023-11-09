import { IUserInfo } from "@/type";
import React, { useEffect, useState } from "react";
import ContactItem from "./ContactItem";
import { useGetQueryAccount } from "@/hooks/useQueryAccount";
import { GET_ALL_USERS } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";

const UsersList = ({ contactSearchValue }: { contactSearchValue: string }) => {
  const [originalContacts, setOriginalContacts] =
    useState<[string, IUserInfo[]][]>();
  const [filtleredContacts, setFilteredContacts] =
    useState<(readonly [string, IUserInfo[]] | null)[]>();

  const { data } = useGetQueryAccount<{
    users: { [key: string]: IUserInfo[] };
  }>({
    url: GET_ALL_USERS,
    queryKey: queryKeys.users,
    options: {
      suspense: true,
    },
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

  return (
    <>
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
    </>
  );
};

export default UsersList;
