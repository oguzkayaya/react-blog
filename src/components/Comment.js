import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

function Comment({
  userName,
  avatar,
  date,
  description,
  userId,
  commentId,
  setCommentDeleted,
}) {
  const history = useHistory();
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
        </tbody>
      </table>
    </div>
  );
}

export default Comment;
