import { UPDATE_CHAT_LIST } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";
import { useGetQueryAccount } from "@/hooks/useQueryAccount";
import { useQueryClient } from "react-query";

const List = () => {
  const queryClient = useQueryClient();
  const loggedInUser = queryClient.getQueryData(queryKeys.userInfo) as any;
  const { data } = useGetQueryAccount({
    queryKey: queryKeys.chatLists,
    url: UPDATE_CHAT_LIST(loggedInUser?.id),
  });

  console.log("chatlist data", data);

  return <div>List</div>;
};

export default List;
