import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import AllPosts from "./components/AllPosts";

function App() {
  const storedJwt = localStorage.getItem("token");
  const [token, setToken] = useState(storedJwt || null);
  const logout = function () {
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Nav token={token} logout={logout}></Nav>
        <Footer></Footer>
        {/* Routes */}
        <Route path="/register" exact component={Register}></Route>
        <Route
          path="/login"
          exact
          component={() => <Login setToken={setToken} token={token} />}
        ></Route>
        <Route path="/" exact component={() => <Home token={token} />}></Route>
        <Route path="/posts/all" exact component={() => <AllPosts token={token} />}></Route>
        <Route
          path="/posts/new"
          exact
          component={() => <NewPost token={token} />}
        ></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
