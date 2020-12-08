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
            <span
              style={{
                fontSize: "32px",
                fontWeight: "600",
              }}
            >
              Lastest Posts
            </span>
            <span>
              {token ? (
                <Link
                  to="/posts/new"
                  style={{
                    padding: "15px",
                    fontWeight: "600",
                    float: "right",
                    display: "inline-block",
                    listStyle: "none",
                  }}
                >
                  <li>New Post</li>
                </Link>
              ) : null}
            </span>
          </div>
          <hr />
          {loading ? (
            <div className="col-md-12">
              <div>Loading...</div>
            </div>
          ) : (
            posts.map((post) => (
              <div className="col-md-12" key={post._id}>
                <Link
                  to={`posts/${post._id}`}
                  style={{ color: "#212529", fontWeight: "600" }}
                >
                  {post.title}
                </Link>
                <div className="text-muted">
                  by {post.userId.name} -{" "}
                  {new Date(post.createDate.toString()).toLocaleString()}
                </div>
                <br />
              </div>
            ))
          )}
          <div>
            <Link
              to="/posts/all"
              style={{
                fontWeight: "600",
                display: "inline-block",
                listStyle: "none",
              }}
            >
              <li>Show all posts</li>
            </Link>
          </div>
        </div>
        {/* replace with sidebar component */}
        <div
          className="col-md-3 p-3"
          style={{ background: "#979797", color: "#fff" }}
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
