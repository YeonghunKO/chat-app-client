import { ADD_MESSAGE } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";
import { getFetch, postFetch } from "@/lib/api";
import { useUserStore } from "@/store";
import type {
  IMessage,
  IUseAddMessage,
  IUseGetAccount,
  IUseMutateAccount,
  IUserInfo,
} from "@/type";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetQueryAccount = <T>({
  mapper,
  queryKey,
  options,
  url,
}: IUseGetAccount) => {
  const result = useQuery<AxiosResponse<T>, AxiosError<any>, T, any>({
    queryKey,
    queryFn: () => getFetch({ url, mapper }),
    ...options,
  });
  return result;
};

export const usePostMutationQueryAccount = <T = any>({
  mapper,
  queryKey,
  onError,
  onSuccess,
  url,
}: IUseMutateAccount) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<T>, AxiosError<any>, T, any>(
    (data) => postFetch({ url, body: data, mapper }),
    {
      onSuccess: (fetchResult) => {
        queryClient.setQueryData(queryKey, () => fetchResult);
        onSuccess && onSuccess();
      },
      onError,
    },
  );

  return mutation;
};

export const useAddMessageQueryForChat = ({
  mapper,
  onError,
  onSuccess,
}: IUseAddMessage) => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<IUserInfo>(queryKeys.userInfo);
  const currentChatUser = useUserStore((set) => set.currentChatUser);
  console.log(userInfo?.id, currentChatUser?.id);

  const mutation = useMutation<
    AxiosResponse<IMessage>,
    AxiosError<any>,
    string,
    any
  >(
    (message) =>
      postFetch({
        url: ADD_MESSAGE,
        body: {
          from: userInfo?.id,
          to: currentChatUser?.id,
          message,
        },
        mapper,
      }),
    {
      onSuccess: (newMessage) => {
        const queryKeysWithChatUser = queryKeys.messages(
          userInfo?.id,
          currentChatUser?.id,
        );

        queryClient.setQueryData(
          queryKeysWithChatUser,
          (prevMessages: IMessage[] | any) => {
            if (prevMessages) {
              return [...prevMessages, newMessage.data];
            }
          },
        );

        onSuccess && onSuccess();
      },

      onError,
    },
  );
  return mutation;
};

export const useGetMessagesQueryForChat = () => {
  console.log("asdf");
};
