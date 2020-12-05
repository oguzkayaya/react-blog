import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav></Nav>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
