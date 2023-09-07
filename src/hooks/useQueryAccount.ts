import { queryKeys } from "@/constant/queryKeys";
import { getFetch, postFetch } from "@/lib/api";
import { useUserStore } from "@/store";
import type { IUseGetAccount, IUseMutateAccount } from "@/type";
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

export const useAddMessageQueryForCurrentChatUser = <T = any>({
  mapper,
  queryKey,
  onError,
  onSuccess,
  url,
}: IUseMutateAccount) => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(queryKeys.userInfo);
  const currentChatUser = useUserStore((set) => set.currentChatUser);

  // const mutation =

  // userInfo , currentChatUser를 가지고 querykeys에 넣어서 querykey를 구성
};

export const useGetMessagesQueryForCurrentChatUser = () => {};
