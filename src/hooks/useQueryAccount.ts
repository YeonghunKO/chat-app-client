import { ADD_MESSAGE } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";
import { getFetch, postFetch } from "@/lib/api";
import { useUserStore } from "@/store";
import type {
  IMessage,
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
    (userInfo) => postFetch({ url, body: userInfo, mapper }),
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
}: IUseMutateAccount) => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<IUserInfo>(queryKeys.userInfo);
  const currentChatUser = useUserStore((set) => set.currentChatUser);

  const mutation = useMutation<
    AxiosResponse<IMessage>,
    AxiosError<any>,
    IMessage,
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

export const useGetMessagesQueryForChat = () => {};
