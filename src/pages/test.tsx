import Loading from "@/components/common/Loading";
import { GET_MESSAGES } from "@/constant/api";
import {
  useGetCurrentMessagesQuery,
  useGetQueryAccount,
} from "@/hooks/useQueryAccount";
import { getFetch } from "@/lib/api";
import { IMessage, IUseQueryOoptionType } from "@/type";
import { AxiosError, AxiosResponse } from "axios";
import { Suspense, useState } from "react";
import { useQuery } from "react-query";

const useTestGetQueryAccount = ({
  options,
}: {
  options: IUseQueryOoptionType<any>;
}) => {
  const result = useQuery<AxiosResponse<any>, AxiosError<any>, any, any>({
    queryKey: ["test"],
    queryFn: () => getFetch({ url: GET_MESSAGES(3, 11) }),
    ...(options && options),
  });
  console.log("result", result);
  return result;
};

const Child = () => {
  const options = { suspense: true };

  // first try ==> working!!
  //   const {
  //     data: fakeData,
  //     isLoading: fakeIsLoading,
  //     error,
  //   } = useQuery<AxiosResponse<any>, AxiosError<any>, any, any>({
  //     queryFn: () =>
  //       fetch("https://jsonplaceholder.typicode.com/todos/1").then((response) =>
  //         response.json(),
  //       ),
  //     queryKey: ["test"],
  //     suspense: true,
  //   });

  // second try ==> working!!
  //   const { data } = useTestGetQueryAccount({
  //     options: {
  //       ...(options && options),
  //     },
  //   });

  // third try ==> working!!
  const { data } = useGetQueryAccount<IMessage[]>({
    queryKey: ["test"],
    url: GET_MESSAGES(3, 11),
    options: {
      ...(options && options),
    },
  });

  console.log("data", data);
  //   console.log("fakeIsLoading", fakeIsLoading);
  return (
    <div className="flex flex-col gap-2">
      {data?.map((comment: any) => {
        return <div>{comment.message}</div>;
      })}
    </div>
  );
};

const Test = () => {
  const [isShowChild, setIsShowChild] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col">
        {isShowChild && <Child />}
        <button
          onClick={() => {
            setIsShowChild(true);
          }}
        >
          show child
        </button>
        <button
          onClick={() => {
            setIsShowChild(false);
          }}
        >
          remove child
        </button>
      </div>
    </Suspense>
  );
};

export default Test;
