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
  const [commentDeleted, setCommentDeleted] = useState(null);
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
  }, [commentAdded, commentDeleted, urlSearch]);
  const linkDisable = { pointerEvents: "none", color: "#979797" };
  return (
    <div>
      {error
        ? error
        : comments.map((comment) => (
            <Comment
              key={comment._id}
              userId={comment.userId._id}
              commentId={comment._id}
              userName={comment.userId.name}
              avatar={avatar}
              date={new Date(comment.createDate.toString()).toLocaleString()}
              description={comment.description}
              setCommentDeleted={setCommentDeleted}
            ></Comment>
          ))}
      <div className="text-center" style={{ fontWeight: "600" }}>
        <Link
          to={`${thisUrl}?page=${parseInt(page) - 1}`}
          style={page <= 1 ? linkDisable : null}
        >
          Previous Page
        </Link>{" "}
        Page: {page} / {lastPage}{" "}
        <Link
          to={`${thisUrl}?page=${parseInt(page) + 1}`}
          style={page >= lastPage ? linkDisable : null}
        >
          Next Page
        </Link>
      </div>
    </div>
  );
}

export default CommentList;
