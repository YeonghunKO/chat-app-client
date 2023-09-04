import { getFetch, postFetch } from "@/lib/api";
import type { IUseGetUserAccount, IUseMutateUserAccount } from "@/type/user";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetQueryAccount = <T>({
  mapper,
  queryKey,
  options,
  url,
}: IUseGetUserAccount) => {
  const result = useQuery<AxiosResponse<T>, AxiosError<any>, T, any>({
    queryKey,
    queryFn: () => getFetch({ url, mapper }),
    ...options,
  });
  return result;
};

export const usePostMutationQueryAccount = ({
  mapper,
  queryKey,
  onError,
  onSuccess,
  url,
}: IUseMutateUserAccount) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, any, any>(
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
