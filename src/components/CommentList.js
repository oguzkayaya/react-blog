import axios from "axios";
import React, { useEffect, useState } from "react";
import avatar from "../default-avatar.jpg";
import Comment from "./Comment";

function CommentList({ postId, commentAdded }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/comments/post/${postId}`)
      .then((response) => {
        setComments(response.data.postsComments);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentAdded]);
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
    </div>
  );
}

export default CommentList;
