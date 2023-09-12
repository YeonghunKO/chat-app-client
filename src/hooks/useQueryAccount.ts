import { ADD_MESSAGE, GET_MESSAGES } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";
import { getFetch, postFetch } from "@/lib/api";
import { useSocketStore, useUserStore } from "@/store";
import type {
  IGetMessages,
  IMessage,
  IUseAddMessage,
  IUseGetAccount,
  IUseGetMessagesMutation,
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
    ...(options && options),
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
      onMutate: () => {
        const previousQueris = queryClient.getQueryData(queryKey);
        return {
          previousQueris,
        };
      },

      onSuccess: (fetchResult) => {
        queryClient.setQueryData(queryKey, () => fetchResult);
        onSuccess && onSuccess();
      },
      onError: (_error, _message, context) => {
        queryClient.setQueriesData(queryKey, context.previousQueris);
        onError && onError(_error.message);
      },
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
  const socket = useSocketStore((set) => set.socket);
  const queryKeysWithChatUser = queryKeys.messages(
    userInfo?.id as number,
    currentChatUser?.id as number,
  );
  const mutation = useMutation<IMessage, AxiosError<any>, string, any>(
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
      onMutate: async (newMessage) => {
        const previouseTodos = queryClient.getQueryData(queryKeysWithChatUser);

        return { previouseTodos };
      },
      onSuccess: (newMessage) => {
        queryClient.setQueryData(
          queryKeysWithChatUser,
          (prevMessages: IMessage[] | any) => {
            return [...prevMessages.messages, newMessage];
          },
        );
        if (socket) {
          socket.emit("send-msg", {
            from: userInfo?.id,
            to: currentChatUser?.id,
            message: newMessage,
          });
        }
        onSuccess && onSuccess();
      },

      onError: (_error, _message, context) => {
        queryClient.setQueryData(
          queryKeysWithChatUser,
          context?.previouseTodos,
        );
        onError && onError(_error.message);
      },
    },
  );
  return mutation;
};

export const useGetCurrentMessagesQuery = (options?: IGetMessages) => {
  try {
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData<IUserInfo>(queryKeys.userInfo);
    const currentChatUser = useUserStore((set) => set.currentChatUser);

    const senderId = userInfo?.id as number;
    const recieverId = currentChatUser?.id as number;

    const queryKeysWithChatUser = queryKeys.messages(senderId, recieverId);

    const { data } = useGetQueryAccount({
      queryKey: queryKeysWithChatUser,
      url: GET_MESSAGES(senderId, recieverId),
      options: {
        ...options?.options,
        ...((!senderId || !recieverId) && { enabled: false }),
      },
    });

    return { data };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const useGetMessagesMutationByFromTo = <T>(
  info?: IUseGetMessagesMutation,
) => {
  const mutation = useMutation<T, AxiosError<any>, any, any>({
    mutationFn: ({ from, to }: { from: number; to: number }) =>
      getFetch({ url: GET_MESSAGES(from, to), mapper: info?.mapper }),
  });

  return mutation;
};
