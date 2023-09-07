import { ADD_MESSAGE, GET_MESSAGES } from "@/constant/api";
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

  const mutation = useMutation<
    { message: IMessage },
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
          userInfo?.id as string,
          currentChatUser?.id as string,
        );

        queryClient.setQueryData(
          queryKeysWithChatUser,
          (prevMessages: IMessage[] | any) => {
            return { messages: [...prevMessages.messages, newMessage.message] };
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
  try {
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData<IUserInfo>(queryKeys.userInfo);
    const currentChatUser = useUserStore((set) => set.currentChatUser);

    const from = userInfo?.id as string;
    const to = currentChatUser?.id as string;

    const queryKeysWithChatUser = queryKeys.messages(from, to);

    const { data } = useGetQueryAccount({
      queryKey: queryKeysWithChatUser,
      url: GET_MESSAGES(from, to),
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
