import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODO } from "../constant";
import useData from "./useData";
import ApiClient from "../services/apiClient";
import todoService, { Todo } from "../services/todoService";

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODO,
    queryFn: todoService.getData,
    staleTime: 10 * 1000,
  });
};

export default useTodos;
