import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "./Button";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const [requesting, setRequesting] = useState(false);
  const history = useHistory();
  const register = function (e) {
    e.preventDefault();
    setRequesting(true);
    axios
      .post(`${process.env.REACT_APP_URL}/register`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      })
      .then(function (response) {
        setError("");
        setSucces("Registered");
        setTimeout(() => {
          history.push("/login");
        }, 2000);
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
    <>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <header className="card-header">
                <div
                  className="card-title mt-2"
                  style={{ fontSize: "32px", fontWeight: "600" }}
                >
                  Sign up
                </div>
              </header>
              <article className="card-body">
                <form>
                  <div className="form-row">
                    <div className="col form-group">
                      <label>Full name </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
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
                    <label>Create password</label>
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
                      onClick={register}
                      disabled={requesting}
                    >
                      Register
                    </Button>
                  </div>
                </form>
                <div style={{ color: "red" }}>{error}</div>
                <div style={{ color: "green" }}>{succes}</div>
                <div>
                  Have an account? <Link to="/login">Log in</Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
