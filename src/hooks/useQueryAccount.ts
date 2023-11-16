import { ADD_MESSAGE, GET_MESSAGES, GET_USER } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";
import { getFetch, postFetch } from "@/lib/api";
import { useSocketStore, useUserStore } from "@/store";
import type {
  TGetMessages,
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

export const useGetLoggedInUserInfo = () => {
  const loggedInUserInfo = useUserStore(
    (set) => set.loggedInUserInfo,
  ) as IUserInfo;

  const { data: freshLoggedInUserInfo } = useGetQueryAccount<IUserInfo>({
    queryKey: queryKeys.userInfo,
    url: GET_USER(loggedInUserInfo?.email as string),
  });
  return freshLoggedInUserInfo || loggedInUserInfo;
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

      onSuccess && onSuccess(newData);
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
      ...(onError && { useErrorBoundary: false }),
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
  const userInfo = useGetLoggedInUserInfo();
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
        const previouseMessages = queryClient.getQueryData(
          queryKeysWithChatUser,
        ) as [string, IMessage[]][];

        const newMessageFormat = {
          id: 0,
          senderId: 0,
          recieverId: 0,
          type: "text",
          message: newMessage,
          status: "",
          createdAt: new Date().toISOString(),
        };
        const newDate = new Date(newMessageFormat.createdAt)
          .toISOString()
          .split("T")[0];

        const lastDateGroup = previouseMessages[previouseMessages.length - 1];
        const lastDate = lastDateGroup[0];
        const lastDateGroupMessages = lastDateGroup[1];

        if (newDate === lastDate) {
          lastDateGroupMessages.push(newMessageFormat);
        } else {
          previouseMessages.push([newDate, [newMessageFormat]]);
        }

        queryClient.setQueryData(
          queryKeysWithChatUser,
          () => previouseMessages,
        );
        return { previouseMessages };
      },
      onSuccess: (newMessage) => {
        if (socket) {
          socket.emit("send-msg", {
            from: userInfo?.id,
            to: currentChatUser?.id,
            message: newMessage,
          });
        }
        onSuccess && onSuccess();
      },

      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeysWithChatUser,
          exact: true,
        });
      },
      ...(onError && { useErrorBoundary: false }),
      onError: (_error, _message, context) => {
        onError && onError(_error.message);
        queryClient.setQueryData(
          queryKeysWithChatUser,
          context?.previouseMessages,
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
  const userInfo = useGetLoggedInUserInfo();
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
        const previouseMessages = queryClient.getQueryData(
          queryKeysWithChatUser,
        );

        return { previouseMessages };
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
      ...(onError && { useErrorBoundary: false }),
      onError: (_error, _message, context) => {
        onError && onError(_error.message);
        queryClient.setQueryData(
          queryKeysWithChatUser,
          context?.previouseMessages,
        );
      },
    },
  );
  return mutation;
};

export const useGetCurrentMessagesQuery = <T>(options?: TGetMessages) => {
  const userInfo = useGetLoggedInUserInfo();
  const currentChatUser = useUserStore((set) => set.currentChatUser);

  const senderId = userInfo?.id as number;
  const recieverId = currentChatUser?.id as number;

  const queryKeysWithChatUser = queryKeys.messages(senderId, recieverId);

  const result = useGetQueryAccount<T>({
    queryKey: queryKeysWithChatUser,
    url: GET_MESSAGES(senderId, recieverId),
    options: {
      ...(options && options),
    },
  });

  return result;
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
