import { ADD_MESSAGE, GET_MESSAGES } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";
import { getFetch, postFetch } from "@/lib/api";
import { useSocketStore, useUserStore } from "@/store";
import type {
  IGetMessages,
  IMessage,
  IUseAddMessage,
  IUseAddMulitMessage,
  IUseGetAccount,
  IUseGetMessagesMutation,
  IUseMutateAccount,
  IUseMutationGetQuery,
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

export const useMutationQuery = <T>({
  queryKey,

  onError,
  onSuccess,
  mutationFunc,
}: IUseMutationGetQuery) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<T, AxiosError<any>, any, any>({
    onMutate: () => {
      const previousData = queryClient.getQueryData(queryKey);
      return { previousData };
    },
    mutationFn: mutationFunc,
    onSuccess: (newData) => {
      queryClient.setQueryData(queryKey, () => {
        return newData;
      });
      onSuccess && onSuccess();
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(queryKey, context.previousData);
      onError && onError(error);
    },
  });

  return mutation;
};

export const usePostMutationQueryAccount = <T = any>({
  mapper,
  queryKey,
  onError,
  onSuccess,
  url,
  httpOptions,
}: IUseMutateAccount) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<T>, AxiosError<any>, T, any>(
    (data) => postFetch({ url, body: data, mapper, option: httpOptions }),
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
        onError && onError(_error.response?.data.message);
        queryClient.setQueriesData(queryKey, context.previousQueris);
      },
    },
  );

  return mutation;
};

export const useAddTextMessageQuery = ({
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
  const mutation = useMutation<IMessage, AxiosError<any>, any, any>(
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
            return [...prevMessages, newMessage];
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
        onError && onError(_error.message);
        queryClient.setQueryData(
          queryKeysWithChatUser,
          context?.previouseTodos,
        );
      },
    },
  );
  return mutation;
};

export const useAddMultiMessageQuery = ({
  mapper,
  onError,
  onSuccess,
  url,
}: IUseAddMulitMessage) => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<IUserInfo>(queryKeys.userInfo);
  const currentChatUser = useUserStore((set) => set.currentChatUser);
  const socket = useSocketStore((set) => set.socket);
  const queryKeysWithChatUser = queryKeys.messages(
    userInfo?.id as number,
    currentChatUser?.id as number,
  );
  const mutation = useMutation<IMessage, AxiosError<any>, any, any>(
    (multiPartData) =>
      postFetch({
        url,
        body: multiPartData,
        option: {
          params: {
            from: userInfo?.id,
            to: currentChatUser?.id,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
            return [...prevMessages, newMessage];
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
        onError && onError(_error.message);
        queryClient.setQueryData(
          queryKeysWithChatUser,
          context?.previouseTodos,
        );
      },
    },
  );
  return mutation;
};

export const useGetCurrentMessagesQuery = <T>(options?: IGetMessages) => {
  try {
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData<IUserInfo>(queryKeys.userInfo);
    const currentChatUser = useUserStore((set) => set.currentChatUser);

    const senderId = userInfo?.id as number;
    const recieverId = currentChatUser?.id as number;

    const queryKeysWithChatUser = queryKeys.messages(senderId, recieverId);

    const result = useGetQueryAccount<T>({
      queryKey: queryKeysWithChatUser,
      url: GET_MESSAGES(senderId, recieverId),
      options: {
        ...options?.options,
      },
    });

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const useGetMessagesMutationByFromTo = <T extends IMessage[]>(
  info?: IUseGetMessagesMutation,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<T, AxiosError<any>, any, any>({
    onMutate: ({ from, to }) => {
      const previousMessages = queryClient.getQueryData(
        queryKeys.messages(from, to),
      );
      return { previousMessages };
    },
    mutationFn: ({ from, to }: { from: number; to: number }) =>
      getFetch({ url: GET_MESSAGES(from, to), mapper: info?.mapper }),

    onSuccess: (newMessages, { from: otherSide, to: me }) => {
      const queryMessagesKeys = queryKeys.messages(me, otherSide);
      queryClient.setQueryData<IMessage[]>(
        queryMessagesKeys,
        (previouseMessages) => {
          return newMessages;
        },
      );
    },
    onError: (error, { from: otherSide, to: me }, context) => {
      const queryMessagesKeys = queryKeys.messages(me, otherSide);
      queryClient.setQueryData(queryMessagesKeys, context.previousMessages);
    },
  });

  return mutation;
};
