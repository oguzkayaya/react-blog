import axios from "axios";
import React, { useState, useEffect } from "react";
import avatar from "../default-avatar.jpg";
import styled from "styled-components";
import NewComment from "./NewComment";

export default function PostDetail({ match, token }) {
  const [error, setError] = useState(null);
  const [post, setPost] = useState({ userId: {}, createDate: "" });
  const [isCommenting, setCommenting] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/posts/${match.params.postId}`)
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, [isCommenting]);
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
              ></NewComment>
            </div>
          </>
        ) : null}
      </div>
      <hr />
      {/* comment */}
      <div className="my-3 col-md-11 offset-md-1">
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
              </td>
            </tr>
            <tr>
              <td className="px-2" style={{ verticalAlign: "top" }}>
                {error ? (
                  error
                ) : (
                  <div
                    style={{ padding: "5px 0" }}
                    dangerouslySetInnerHTML={{
                      __html: post.description,
                    }}
                  ></div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
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
                  className="card-img-top px-3 pt-3"
                  alt="default-avatar"
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
              </td>
            </tr>
            <tr>
              <td className="px-2" style={{ verticalAlign: "top" }}>
                {error ? (
                  error
                ) : (
                  <div
                    style={{ padding: "5px 0" }}
                    dangerouslySetInnerHTML={{
                      __html: post.description,
                    }}
                  ></div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
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
                  className="card-img-top px-3 pt-3"
                  alt="default-avatar"
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
              </td>
            </tr>
            <tr>
              <td className="px-2" style={{ verticalAlign: "top" }}>
                {error ? (
                  error
                ) : (
                  <div
                    style={{ padding: "5px 0" }}
                    dangerouslySetInnerHTML={{
                      __html: post.description,
                    }}
                  ></div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
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
                  className="card-img-top px-3 pt-3"
                  alt="default-avatar"
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
              </td>
            </tr>
            <tr>
              <td className="px-2" style={{ verticalAlign: "top" }}>
                {error ? (
                  error
                ) : (
                  <div
                    style={{ padding: "5px 0" }}
                    dangerouslySetInnerHTML={{
                      __html: post.description,
                    }}
                  ></div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
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
                  className="card-img-top px-3 pt-3"
                  alt="default-avatar"
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
              </td>
            </tr>
            <tr>
              <td className="px-2" style={{ verticalAlign: "top" }}>
                {error ? (
                  error
                ) : (
                  <div
                    style={{ padding: "5px 0" }}
                    dangerouslySetInnerHTML={{
                      __html: post.description,
                    }}
                  ></div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

const Button = styled.button`
  color: #fff;
  background: var(--dark-color);
  &:hover,
  &:active,
  &:visited {
    color: #fff;
    background: var(--light-color);
  }
  &:disabled {
    background: var(--light-color);
  }
`;
