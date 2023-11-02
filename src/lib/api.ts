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

export const getFetch = async ({ url, mapper, option }: IFetch) => {
  const { data } = await client.get(url, { ...option });

  return mapper ? mapper(data) : data;
};

export const postFetch = async ({ url, body, mapper, option }: IFetch) => {
  const { data } = await client.post(url, body, { ...option });

  return mapper ? mapper(data) : data;
};
