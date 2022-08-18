import "./App.css";
import { useState } from "react";
import { authContext } from "./helpers/authContext";

import Navbar from "./pages/navigations/Navbar";

function App() {

  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState();

  return (
    <authContext.Provider value={{ logged, setLogged, user, setUser }} >
      <div className="App">
        <div className="App-container">
         <Navbar />
        </div>
      </div>
    </authContext.Provider>
  );
}

export default App;
