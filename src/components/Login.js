import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function Home({ setToken }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const login = function (e) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}/login`, formData)
      .then(async function (response) {
        setError("");
        setSucces("Login Succesfully");
        setTimeout(() => {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
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
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <header className="card-header">
                <h4 className="card-title mt-2">Sign In</h4>
              </header>
              <article className="card-body">
                <form>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      className="form-control"
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <Button
                      type="submit"
                      className="btn btn-block"
                      onClick={login}
                    >
                      Login
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