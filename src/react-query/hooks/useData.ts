import axios, { AxiosRequestConfig } from "axios";

const useData = <T>(endpoint: string, params: AxiosRequestConfig) => {
  const apiClient = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });
  return apiClient.get<T[]>(endpoint, params);
};

export default useData;
