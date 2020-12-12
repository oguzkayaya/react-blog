import axios from "axios";
import React, { useState } from "react";
import thumbUp from "../thumb_up.svg";
import thumbDown from "../thumb_down.svg";

function Comment({
  userName,
  avatar,
  date,
  description,
  userId,
  commentId,
  setCommentDeleted,
  likeCountInit,
  dislikeCountInit,
  likedInit,
  dislikedInit,
}) {
  const [likeCount, setLikeCount] = useState(likeCountInit);
  const [dislikeCount, setDislikeCount] = useState(dislikeCountInit);
  const [liked, setLiked] = useState(likedInit);
  const [disliked, setDisliked] = useState(dislikedInit);
  const [likeRequesting, setLikeRequesting] = useState(false);
  const deleteComment = () => {
    if (window.confirm("Delete ?")) {
      axios
        .delete(`${process.env.REACT_APP_URL}/comments/${commentId}`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setCommentDeleted(response.data.deletedComment._id);
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    }
  };
  const likeComment = () => {
    setLikeRequesting(true);
    axios
      .get(`${process.env.REACT_APP_URL}/comments/like/${commentId}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLikeCount(response.data.likeCount);
        setDislikeCount(response.data.dislikeCount);
        setLiked(response.data.liked);
        setDisliked(response.data.disliked);
        setLikeRequesting(false);
      })
      .catch((error) => {
        setLikeRequesting(false);
      });
  };
  const dislikeComment = () => {
    setLikeRequesting(true);
    axios
      .get(`${process.env.REACT_APP_URL}/comments/dislike/${commentId}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLikeCount(response.data.likeCount);
        setDislikeCount(response.data.dislikeCount);
        setLiked(response.data.liked);
        setDisliked(response.data.disliked);
        setLikeRequesting(false);
      })
      .catch((error) => {
        setLikeRequesting(false);
      });
  };
  return (
    <div>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td
              width="125"
              rowSpan="3"
              className="text-center"
              style={{ verticalAlign: "top" }}
            >
              <img
                src={avatar}
                className="card-img-top"
                alt="default-avatar"
                style={{ height: "auto", width: "70%" }}
              />
              <div className="card-title font-weight-bold">{userName}</div>
            </td>
            <td
              className="px-2"
              style={{
                background: "#979797",
                color: "#fff",
                height: "10px",
              }}
            >
              {date}
              {localStorage.getItem("userId") === userId ? (
                <div
                  className="float-right px-2"
                  onClick={() => deleteComment()}
                >
                  Delete
                </div>
              ) : null}
            </td>
          </tr>
          <tr>
            <td className="px-2" style={{ verticalAlign: "top" }}>
              <div
                style={{ padding: "5px 0" }}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
            </td>
          </tr>
          <tr>
            <td>
              <span style={{ float: "left" }}>
                <button
                  disabled={likeRequesting}
                  style={liked ? { backgroundColor: "#a7d3fa" } : null}
                  className="btn btn-sm"
                  onClick={() => {
                    likeComment();
                  }}
                >
                  <img
                    src={thumbUp}
                    alt="like"
                    style={{ verticalAlign: "top" }}
                  />{" "}
                  {likeCount}
                </button>{" "}
                -{" "}
                <button
                  disabled={likeRequesting}
                  style={disliked ? { backgroundColor: "#a7d3fa" } : null}
                  className="btn btn-sm"
                  onClick={() => {
                    dislikeComment();
                  }}
                >
                  <img
                    src={thumbDown}
                    alt="dislike"
                    style={{
                      verticalAlign: "top",
                    }}
                  />{" "}
                  {dislikeCount}
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Comment;
