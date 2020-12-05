import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function NewPost({ token }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const history = useHistory();
  const createPost = function (e) {
    e.preventDefault();
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_URL}/posts`, formData, {
        headers: {
          "auth-token": token,
        },
      })
      .then(function (response) {
        setError("");
        setSucces("Post Saved");
        //Kayıt edilen postun sayfasına git
        //ana sayfaya değil
        setTimeout(() => {
          history.push("/");
        }, 2000);
      })
      .catch(function (error) {
        setSucces("");
        setError(error.response.data.error);
      });
  };
  return (
    <div>
      <div className="container mt-4 p-0">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <header className="card-header">
                <h4 className="card-title mt-2">New Post Page</h4>
              </header>
              <article className="card-body">
                <form>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label>Title</label>
                      </div>
                      <div className="col-md-10 p-0 m-0">
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label>Description</label>
                      </div>
                      <div className="col-md-10 p-0 m-0">
                        <textarea
                          className="form-control"
                          name="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          rows="12"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <Button type="submit" className="btn" onClick={createPost}>
                      Create
                    </Button>
                  </div>
                </form>
                <div style={{ color: "red" }}>{error}</div>
                <div style={{ color: "green" }}>{succes}</div>
              </article>
            </div>
          </div>
        </div>
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
`;
