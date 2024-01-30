import axios from "axios";
import React, { useEffect, useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  //   const [userId, setUserId] = useState<number>();
  const pageSize = 10;
  //   const [page, setPage] = useState(1);

  const {
    data: posts,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
        className="btn btn-primary ms-1"
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
      {/* <select
        value={userId}
        onChange={(event) => setUserId(parseInt(event.target.value))}
        className="form-select mb-3"
        aria-label="user"
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select> */}
      {/* <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn btn-primary my-3"
      >
        Previous
      </button> */}
      {/* <button
        onClick={() => setPage(page + 1)}
        className="btn btn-primary ms-1"
      >
        Next
      </button> */}
    </>
  );
};

export default PostList;
