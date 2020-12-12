import axios from "axios";
import React, { useState, useEffect } from "react";
import avatar from "../default-avatar.jpg";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import Button from "./Button";
import { useHistory } from "react-router-dom";

export default function PostDetail({ match, token, location }) {
  const [error, setError] = useState(null);
  const [post, setPost] = useState({ userId: {}, createDate: "" });
  const [isCommenting, setCommenting] = useState(false);
  const [commentAdded, setCommentAdded] = useState(0);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/posts/${match.params.postId}`)
      .then((response) => {
        setPost(response.data.post);
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
                <div style={{ textAlign: "right" }}>
                  <Button
                    className="btn"
                    style={{ width: "200px" }}
                    onClick={() => {
                      setCommenting(true);
                    }}
                  >
                    Reply
                  </Button>
                </div>
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
