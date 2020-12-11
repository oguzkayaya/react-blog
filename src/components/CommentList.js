import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../default-avatar.jpg";
import Comment from "./Comment";

function CommentList({ postId, commentAdded, urlSearch, thisUrl }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/comments/post/${postId}${urlSearch}`)
      .then((response) => {
        setComments(response.data.postsComments);
        setPage(response.data.page);
        setLastPage(response.data.lastPage);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentAdded, urlSearch]);
  return (
    <div>
      {error
        ? error
        : comments.map((comment) => (
            <Comment
              key={comment._id}
              userName={comment.userId.name}
              avatar={avatar}
              date={new Date(comment.createDate.toString()).toLocaleString()}
              description={comment.description}
            ></Comment>
          ))}
      <div className="text-center">
        <Link to={`${thisUrl}?page=${parseInt(page) - 1}`}>Previous Page</Link>
        Page: {page} / {lastPage}
        <Link to={`${thisUrl}?page=${parseInt(page) + 1}`}>Next Page</Link>
      </div>
    </div>
  );
}

export default CommentList;
