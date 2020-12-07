import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home({ token }) {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/posts`).then((res) => {
      setloading(false);
      setPosts(res.data.posts);
    });
  }, []);
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-9">
          <div className="col-md-12">
            <h1 className="font-weight-bold">
              <span>Lastest Posts </span>
              <span className="small text-muted float-right">
                {token ? (
                  <Link className="inline-block list-unstyled" to="/posts/new">
                    <li>New Post</li>
                  </Link>
                ) : null}
              </span>
            </h1>
          </div>
          <hr />
          {loading ? (
            <div className="col-md-12">
              <h2>Loading</h2>
            </div>
          ) : (
            posts.map((post) => (
              <div className="col-md-12" key={post._id}>
                <h4>
                  <div className="font-weight-bold ">
                    <Link
                      to={`posts/${post._id}`}
                      style={{ color: "#212529" }}
                    >
                      {post.title}
                    </Link>
                  </div>
                  <div className="small text-muted">
                    {post.userId.name} -{" "}
                    {new Date(post.createDate.toString()).toLocaleString()}
                  </div>
                </h4>
                <br />
              </div>
            ))
          )}
          <div>
            <Link className="list-unstyled" to="/posts/all">
              <li>Show all posts</li>
            </Link>
          </div>
        </div>
        {/* replace with sidebar component */}
        <div
          className="col-md-3 p-3"
          style={{
            background: "#dacece",
            color: "#fff",
          }}
        >
          SIDE BAR
          <br />
          SEARCH
          <br />
          CATEGORIES
          <br />
          ARCHIVE, YEARS, MONTHS
        </div>
      </div>
    </div>
  );
}
