import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import EditorContainer from "./EditorContainer";

export default function Comment({ token, postId, setCommenting }) {
  const [description, setDescription] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const history = useHistory();
  const saveComment = function (e) {
    e.preventDefault();
    setRequesting(true);
    axios
      .post(
        `${process.env.REACT_APP_URL}/comments`,
        {
          description,
          postId,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then(function (response) {
        setError("");
        setSucces("Comment Saved");
        setTimeout(() => {
          setCommenting(false);
        }, 1000);
      })
      .catch(function (error) {
        setSucces("");
        setError(error.response.data.error);
        setTimeout(() => {
          setRequesting(false);
        }, 1000);
      });
  };
  return (
    <div>
      Your Comment
      <EditorContainer setDescriptionMarkup={setDescription}></EditorContainer>
      <div>
        <Button className="btn m-2" disabled={requesting} onClick={saveComment}>
          Save
        </Button>
        <Button
          className="btn m-2"
          disabled={requesting}
          onClick={() => setCommenting(false)}
        >
          Cancel
        </Button>
        <div style={{ color: "red" }}>{error}</div>
        <div style={{ color: "green" }}>{succes}</div>
      </div>
    </div>
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
