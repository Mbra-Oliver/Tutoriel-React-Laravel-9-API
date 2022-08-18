import React, { useContext, useEffect } from "react";

import { Routes, Route, Link } from "react-router-dom";
import Serie from "./../series/Serie";
import Details from "./../films/Details";
import Login from "./../auth/Login";
import Profil from "./../profil/Profil";

import Film from "./../films/Film";
import { authContext } from "../../helpers/authContext";

export default function Navbar() {
  const { logged, setLogged } = useContext(authContext);

  useEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = () => {
    if (localStorage.getItem("user_token")) {
      setLogged(true);
    }
  };

  return (
    <div>
      <div className="topnav">
        <Link to="/">Accueil</Link>
        <Link to="/series">Serie</Link>
        {!logged ? (
          <Link to="/account">Me connecter</Link>
        ) : (
          <Link to="/profil">Mon Profil</Link>
        )}
      </div>
      <Routes>
        <Route path="/" exact element={<Film />} />
        <Route path="/films/:id" element={<Details />} />
        <Route path="/series" element={<Serie />} />
        <Route path="/account" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </div>
  );
}
