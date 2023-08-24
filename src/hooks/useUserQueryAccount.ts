import { getFetch, postFetch } from "@/lib/api";
import type {
  IUseGetUserAccount,
  IUseMutateUserAccount,
  IUserInfo,
} from "@/type/user";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetQueryAccount = ({
  mapper,
  queryKey,
  options,
  url,
}: IUseGetUserAccount) => {
  const result = useQuery({
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
  const mutation = useMutation<any, any, IUserInfo>(
    (userInfo) => postFetch({ url, body: userInfo, mapper }),
    {
      onSuccess: (fetchResult) => {
        queryClient.setQueriesData(queryKey, () => fetchResult);
        onSuccess && onSuccess();
      },
      onError,
    },
  );

  return mutation;
};
