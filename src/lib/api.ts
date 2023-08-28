import axios from "axios";

export interface IFetch {
  url: string;
  body?: any;
  mapper?: (data: any) => any;
}

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getFetch = async ({ url, mapper }: IFetch) => {
  const { data } = await client.get(url);

  return mapper ? mapper(data) : data;
};

export const postFetch = async ({ url, body, mapper }: IFetch) => {
  const { data } = await client.post(url, body);

  return mapper ? mapper(data) : data;
};
