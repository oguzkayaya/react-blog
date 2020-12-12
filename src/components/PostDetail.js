import axios from "axios";
import React, { useState, useEffect } from "react";
import avatar from "../default-avatar.jpg";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import Button from "./Button";
import { useHistory } from "react-router-dom";
import thumbUp from "../thumb_up.svg";
import thumbDown from "../thumb_down.svg";

export default function PostDetail({ match, token, location }) {
  const [error, setError] = useState(null);
  const [post, setPost] = useState({
    userId: {},
    createDate: "",
    likes: [],
    dislikes: [],
  });
  const [isCommenting, setCommenting] = useState(false);
  const [commentAdded, setCommentAdded] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeRequesting, setLikeRequesting] = useState(false);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/posts/${match.params.postId}`)
      .then((response) => {
        setPost(response.data.post);
        setLikeCount(response.data.post.likes.length);
        setDislikeCount(response.data.post.dislikes.length);
        setLiked(
          response.data.post.likes.includes(localStorage.getItem("userId"))
        );
        setDisliked(
          response.data.post.dislikes.includes(localStorage.getItem("userId"))
        );
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateComments = () => {
    setCommentAdded(commentAdded + 1);
  };
  const deletePost = (postId) => {
    if (window.confirm("Delete ?")) {
      axios
        .delete(`${process.env.REACT_APP_URL}/posts/${postId}`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then(() => {
          history.push("/");
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    }
  };
  const likePost = (postId) => {
    setLikeRequesting(true);
    axios
      .get(`${process.env.REACT_APP_URL}/posts/like/${postId}`, {
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
  const dislikePost = (postId) => {
    setLikeRequesting(true);
    axios
      .get(`${process.env.REACT_APP_URL}/posts/dislike/${postId}`, {
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
    <>
      <div className="m-3">
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td
                width="150"
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
                <div className="card-title font-weight-bold">
                  {post.userId.name || null}
                </div>
              </td>
              <td
                className="px-2"
                style={{
                  background: "#979797",
                  color: "#fff",
                  height: "10px",
                }}
              >
                {new Date(post.createDate.toString()).toLocaleString()}
                {localStorage.getItem("userId") === post.userId._id ? (
                  <div
                    className="float-right px-2"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete
                  </div>
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="px-2">
                {error ? (
                  error
                ) : (
                  <div>
                    <div
                      style={{
                        fontSize: "32px",
                        fontWeight: "600",
                        padding: "5px 0",
                      }}
                    >
                      {post.title}
                    </div>
                    <hr style={{ margin: "0" }} />
                    <div
                      style={{ padding: "5px 0" }}
                      dangerouslySetInnerHTML={{
                        __html: post.description,
                      }}
                    ></div>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <span style={{ float: "left" }}>
                  <button
                    disabled={likeRequesting}
                    style={liked ? { backgroundColor: "#a7d3fa" } : null}
                    className="btn"
                    onClick={() => {
                      likePost(post._id);
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
                    className="btn"
                    onClick={() => {
                      dislikePost(post._id);
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
                <span style={{ float: "right" }}>
                  <Button
                    className="btn"
                    style={{ width: "200px" }}
                    onClick={() => {
                      setCommenting(true);
                    }}
                  >
                    Reply
                  </Button>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        {isCommenting ? (
          <>
            <hr />
            <div className="offset-md-1">
              <NewComment
                setCommenting={setCommenting}
                postId={match.params.postId}
                token={token}
                updateComments={updateComments}
                thisUrl={match.url}
              ></NewComment>
            </div>
          </>
        ) : null}
      </div>
      <hr />
      <div className="my-3 col-md-11 offset-md-1">
        <CommentList
          postId={match.params.postId}
          commentAdded={commentAdded}
          urlSearch={location.search}
          thisUrl={match.url}
        ></CommentList>
      </div>
    </>
  );
}
