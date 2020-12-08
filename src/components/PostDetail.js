import axios from "axios";
import React, { useState, useEffect } from "react";
import avatar from "../default-avatar.jpg";
import styled from "styled-components";

export default function PostDetail({ match, token }) {
  const [error, setError] = useState(null);
  const [post, setPost] = useState({ userId: {}, createDate: "" });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/posts/${match.params.postId}`)
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, []);
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
                    type="submit"
                    className="btn"
                    style={{ width: "200px" }}
                  >
                    Reply
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      {/* comment */}
      <div className="my-3 col-md-11 offset-1">
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
