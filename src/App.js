import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav></Nav>
        <Footer></Footer>
        {/* Routes */}
        <Route path="/register" exact component={Register}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
