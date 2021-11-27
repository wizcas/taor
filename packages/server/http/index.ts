import axios, { AxiosRequestConfig } from 'axios';

export async function get(url: string, options: AxiosRequestConfig) {
  const { params } = options;
  const resp = await axios.get(url, {
    params,
  });
  return resp.data;
}
