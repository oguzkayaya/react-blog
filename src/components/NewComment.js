import axios from "axios";
import React, { useState } from "react";
import Button from "./Button";
import EditorContainer from "./EditorContainer";

export default function Comment({
  token,
  postId,
  setCommenting,
  updateComments,
}) {
  const [description, setDescription] = useState(null);
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
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
          updateComments();
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