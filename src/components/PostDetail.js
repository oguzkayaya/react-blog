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
              <td width="150" rowSpan="3" className="text-center">
                <img
                  src={avatar}
                  className="card-img-top px-4 py-1"
                  alt="default-avatar"
                />
                <h5 className="card-title font-weight-bold">
                  {post.userId.name || null}
                </h5>
              </td>
              <td
                className="px-2"
                style={{
                  background: "#979797",
                  color: "#e2e2e2",
                }}
              >
                {new Date(post.createDate.toString()).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="p-2" style={{ verticalAlign: "top" }}>
                {error ? (
                  error
                ) : (
                  <div>
                    <h4 className="font-weight-bold">{post.title}</h4>
                    <hr />
                    <p>{post.description}</p>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="px-2 text-right" style={{ verticalAlign: "top" }}>
                <Button type="submit" className="btn">
                  Reply
                </Button>
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
              <td width="125" rowSpan="3" className="text-center">
                <img
                  src={avatar}
                  className="card-img-top px-4 py-1"
                  alt="default-avatar"
                />
                <h5 className="card-title font-weight-bold">
                  {post.userId.name || null}
                </h5>
              </td>
              <td
                className="px-2"
                style={{
                  background: "#979797",
                  color: "#e2e2e2",
                }}
              >
                {new Date(post.createDate.toString()).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="p-2" style={{ verticalAlign: "top" }}>
                {error ? (
                  error
                ) : (
                  <div>
                    <p>{post.description}</p>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td width="125" rowSpan="3" className="text-center">
                <img
                  src={avatar}
                  className="card-img-top px-4 py-1"
                  alt="default-avatar"
                />
                <h5 className="card-title font-weight-bold">
                  {post.userId.name || null}
                </h5>
              </td>
              <td
                className="px-2"
                style={{
                  background: "#979797",
                  color: "#e2e2e2",
                }}
              >
                {new Date(post.createDate.toString()).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="p-2" style={{ verticalAlign: "top" }}>
                {error ? (
                  error
                ) : (
                  <div>
                    <p>{post.description}</p>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
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
