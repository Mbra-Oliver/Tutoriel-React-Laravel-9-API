import "./App.css";
import Film from "./pages/films/Film";
import { Routes, Route, Link } from "react-router-dom";
import Serie from "./pages/series/Serie";
import Details from "./pages/films/Details";

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <div className="topnav">
          <Link to="/">Accueil</Link>
          <Link to="/series">Serie</Link>
        </div>
        <Routes>
          <Route path="/" exact element={<Film />} />
          <Route path="/films/:id" element={<Details />} />
          <Route path="/series" element={<Serie />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
