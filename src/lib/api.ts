import axios, { AxiosRequestConfig } from "axios";

export interface IFetch {
  url: string;
  body?: any;
  mapper?: (data: any) => any;
  option?: AxiosRequestConfig;
}

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// client.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     const { status } = err.response;
//     console.log("err.response", err.response);
//     // if (status >= 500) {
//     //   toast.error('앗! 오류가 발생했어요.' + '\n' + '잠시 후에 다시 시도해보세요.');
//     // }
//     return err;
//   },
// );

export const getFetch = async ({ url, mapper, option }: IFetch) => {
  const { data } = await client.get(url, { ...option });

  return mapper ? mapper(data) : data;
};

export const postFetch = async ({ url, body, mapper, option }: IFetch) => {
  const { data } = await client.post(url, body, { ...option });

  return mapper ? mapper(data) : data;
};
