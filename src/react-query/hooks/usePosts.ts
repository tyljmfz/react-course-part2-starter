import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import useData from "./useData";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  //   page: number;
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  const fetchPosts = ({ pageParam = 1 }) => {
    return useData<Post>("posts", {
      params: {
        _start: (pageParam - 1) * query.pageSize,
        _limit: query.pageSize,
      },
    }).then((res) => res.data);
  };
  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.length > 0 ? allPage.length + 1 : undefined;
    },
  });
  //   return useQuery<Post[], Error>({
  //     // follow the same pattern as /users/1/posts
  //     // 每当userId变化，会重新fetch，类似useEffect的deps
  //     // queryKey: userId ? ["users", userId, "posts"] : ["posts"],
  //     queryKey: ["posts", query],
  //     queryFn: fetchPosts,
  //     keepPreviousData: true,
  //   });
};

export default usePosts;
